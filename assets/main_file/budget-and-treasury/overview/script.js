
        class MunicipalPortal {
            constructor() {
                this.documentsContainer = document.getElementById('documentsContainer');
                this.modal = document.getElementById('documentModal');
                this.searchInput = document.getElementById('searchInput');
                this.searchInfo = document.getElementById('searchInfo');
                this.uploadForm = document.getElementById('uploadForm');
                this.messageContainer = document.getElementById('messageContainer');
                this.documentsList = document.getElementById('documentsList');
                
                this.allDocuments = [];
                this.filteredDocuments = [];
                this.currentTab = 'documents';
                
                this.initializePortal();
            }

            initializePortal() {
                this.loadDocuments();
                this.setupSearch();
                this.setupUploadForm();
                this.loadCurrentDocuments();
            }

            switchTab(tabName) {
                // Update tab buttons
                document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
                event.target.classList.add('active');
                
                // Update tab content
                document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
                
                if (tabName === 'documents') {
                    document.getElementById('documentsTab').classList.add('active');
                    this.loadDocuments(); // Refresh documents when switching to documents tab
                } else if (tabName === 'admin') {
                    document.getElementById('adminTab').classList.add('active');
                    this.loadCurrentDocuments(); // Refresh admin list when switching to admin tab
                }
                
                this.currentTab = tabName;
            }

            // Documents functionality
            setupSearch() {
                this.searchInput.addEventListener('input', (e) => {
                    this.performSearch(e.target.value);
                });
            }

            performSearch(query) {
                const searchTerm = query.toLowerCase().trim();
                
                if (searchTerm === '') {
                    this.filteredDocuments = [...this.allDocuments];
                    this.searchInfo.textContent = '';
                } else {
                    this.filteredDocuments = this.allDocuments.filter(doc => {
                        return doc.title.toLowerCase().includes(searchTerm) ||
                               doc.fileName.toLowerCase().includes(searchTerm) ||
                               (doc.description && doc.description.toLowerCase().includes(searchTerm));
                    });
                    
                    const resultCount = this.filteredDocuments.length;
                    this.searchInfo.textContent = `Found ${resultCount} document${resultCount !== 1 ? 's' : ''} matching "${query}"`;
                }
                
                this.renderFilteredDocuments();
            }

            highlightSearchTerm(text, searchTerm) {
                if (!searchTerm) return text;
                
                const regex = new RegExp(`(${searchTerm})`, 'gi');
                return text.replace(regex, '<span class="search-highlight">$1</span>');
            }

            loadDocuments() {
                this.allDocuments = this.getDocumentsFromStorage();
                this.filteredDocuments = [...this.allDocuments];
                
                if (this.allDocuments.length === 0) {
                    this.showEmptyState();
                    return;
                }

                this.renderFilteredDocuments();
            }

            renderFilteredDocuments() {
                if (this.filteredDocuments.length === 0) {
                    if (this.searchInput.value.trim() !== '') {
                        this.showNoSearchResults();
                    } else {
                        this.showEmptyState();
                    }
                    return;
                }

                this.documentsContainer.innerHTML = '';
                const searchTerm = this.searchInput.value.toLowerCase().trim();
                
                this.filteredDocuments.forEach(doc => this.renderDocument(doc, searchTerm));
            }

            renderDocument(doc, searchTerm = '') {
                const card = document.createElement('div');
                card.className = 'document-card';
                
                const thumbnail = this.generateThumbnail(doc);
                const highlightedTitle = this.highlightSearchTerm(doc.title, searchTerm);
                const highlightedFileName = this.highlightSearchTerm(doc.fileName, searchTerm);
                
                card.innerHTML = `
                    <div class="document-thumbnail">${thumbnail}</div>
                    <div class="document-title">${highlightedTitle}</div>
                    <div class="document-meta">
                        <span class="document-date">📅 ${doc.uploadDate}</span>
                        <span class="download-count">⬇️ ${doc.downloadCount} downloads</span>
                    </div>
                    <div class="document-meta">
                        <span class="document-date">📁 ${highlightedFileName}</span>
                        <span class="document-date">📏 ${doc.fileSize}</span>
                    </div>
                    <div class="button-container">
                        <button class="view-btn" onclick="municipalPortal.viewDocument('${doc.id}')">
                            👁️ View
                        </button>
                        <button class="download-btn" onclick="municipalPortal.downloadDocument('${doc.id}')">
                            📥 Download
                        </button>
                    </div>
                `;

                this.documentsContainer.appendChild(card);
            }

            // Admin upload functionality
            setupUploadForm() {
                this.uploadForm.addEventListener('submit', (e) => this.handleUpload(e));
            }

            async handleUpload(e) {
                e.preventDefault();
                
                const title = document.getElementById('documentTitle').value.trim();
                const fileInput = document.getElementById('documentFile');
                const file = fileInput.files[0];

                if (!title || !file) {
                    this.showMessage('Please fill in all required fields.', 'error');
                    return;
                }

                const uploadBtn = document.getElementById('uploadBtn');
                uploadBtn.disabled = true;
                uploadBtn.textContent = '📤 Uploading...';

                try {
                    const fileContent = await this.fileToBase64(file);
                    
                    const document = {
                        id: this.generateId(),
                        title: title,
                        fileName: file.name,
                        fileType: file.type,
                        fileContent: fileContent,
                        uploadDate: this.formatDate(new Date()),
                        downloadCount: 0,
                        fileSize: this.formatFileSize(file.size)
                    };

                    this.saveDocument(document);
                    this.uploadForm.reset();
                    this.showMessage(`Document "${title}" uploaded successfully!`, 'success');
                    this.loadCurrentDocuments();
                    
                    // Refresh documents tab if it's currently active
                    if (this.currentTab === 'documents') {
                        this.loadDocuments();
                    }
                    
                } catch (error) {
                    this.showMessage('Error uploading file. Please try again.', 'error');
                    console.error('Upload error:', error);
                } finally {
                    uploadBtn.disabled = false;
                    uploadBtn.textContent = '📤 Upload Document';
                }
            }

            fileToBase64(file) {
                return new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onload = () => resolve(reader.result);
                    reader.onerror = error => reject(error);
                });
            }

            saveDocument(document) {
                const documents = this.getDocumentsFromStorage();
                documents.push(document);
                localStorage.setItem('municipalDocuments', JSON.stringify(documents));
            }

            deleteDocument(docId) {
                if (confirm('Are you sure you want to delete this document?')) {
                    const documents = this.getDocumentsFromStorage();
                    const filteredDocuments = documents.filter(doc => doc.id !== docId);
                    localStorage.setItem('municipalDocuments', JSON.stringify(filteredDocuments));
                    this.loadCurrentDocuments();
                    this.showMessage('Document deleted successfully.', 'success');
                    
                    // Refresh documents tab if it's currently active
                    if (this.currentTab === 'documents') {
                        this.loadDocuments();
                    }
                }
            }

            loadCurrentDocuments() {
                const documents = this.getDocumentsFromStorage();
                
                if (documents.length === 0) {
                    this.documentsList.innerHTML = '<p style="color: #6b7280; text-align: center; padding: 2rem;">No documents uploaded yet.</p>';
                    return;
                }

                this.documentsList.innerHTML = documents.map(doc => {
                    const thumbnail = this.generateThumbnail(doc);
                    return `
                        <div class="document-item">
                            <div class="document-info">
                                <div class="admin-thumbnail">${thumbnail}</div>
                                <div class="document-details">
                                    <div class="document-name">${doc.title}</div>
                                    <div class="document-meta-small">
                                        📁 ${doc.fileName} • 📅 ${doc.uploadDate} • ⬇️ ${doc.downloadCount} downloads
                                    </div>
                                </div>
                            </div>
                            <button class="delete-btn" onclick="municipalPortal.deleteDocument('${doc.id}')">
                                🗑️ Delete
                            </button>
                        </div>
                    `;
                }).join('');
            }

            // Shared functionality
            getDocumentsFromStorage() {
                const stored = localStorage.getItem('municipalDocuments');
                return stored ? JSON.parse(stored) : [];
            }

            generateThumbnail(doc) {
                if (!doc.fileType) {
                    return '📄';
                }

                if (doc.fileType.startsWith('image/')) {
                    return `<img src="${doc.fileContent}" alt="${doc.title}" />`;
                } else if (doc.fileType === 'application/pdf') {
                    return this.generatePDFThumbnail(doc);
                } else if (doc.fileType.includes('text')) {
                    return this.generateTextThumbnail(doc);
                } else if (doc.fileType.includes('word') || doc.fileType.includes('document')) {
                    return '📘';
                } else if (doc.fileType.includes('spreadsheet') || doc.fileType.includes('excel')) {
                    return '📊';
                } else {
                    return '📄';
                }
            }

            generatePDFThumbnail(doc) {
                return `
                    <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; background: #f3f4f6; border-radius: 6px;">
                        <div style="font-size: 2rem; color: #dc2626;">📕</div>
                        <div style="font-size: 0.7rem; color: #6b7280; margin-top: 4px;">PDF</div>
                        <div style="font-size: 0.6rem; color: #9ca3af;">${this.formatFileSize(doc.fileContent?.length || 0)}</div>
                    </div>
                `;
            }

            generateTextThumbnail(doc) {
                try {
                    if (doc.fileContent) {
                        const base64Data = doc.fileContent.split(',')[1];
                        const textContent = atob(base64Data);
                        const preview = textContent.substring(0, 100).replace(/\n/g, ' ');
                        
                        return `
                            <div style="display: flex; flex-direction: column; height: 100%; background: #f9fafb; border-radius: 6px; padding: 4px; overflow: hidden;">
                                <div style="font-size: 0.6rem; color: #374151; line-height: 1.2; overflow: hidden; text-overflow: ellipsis;">
                                    ${preview}${textContent.length > 100 ? '...' : ''}
                                </div>
                                <div style="margin-top: auto; font-size: 0.5rem; color: #9ca3af; text-align: center;">
                                    📝 TXT
                                </div>
                            </div>
                        `;
                    }
                } catch (e) {
                    // Fallback if text decoding fails
                }
                return '📝';
            }

            downloadDocument(docId) {
                const documents = this.getDocumentsFromStorage();
                const docIndex = documents.findIndex(doc => doc.id === docId);
                
                if (docIndex !== -1) {
                    const doc = documents[docIndex];
                    
                    documents[docIndex].downloadCount++;
                    this.saveDocumentsToStorage(documents);
                    this.loadDocuments();
                    this.loadCurrentDocuments(); // Also refresh admin list
                    
                    if (doc.fileContent) {
                        const link = document.createElement('a');
                        link.href = doc.fileContent;
                        link.download = doc.fileName;
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                    } else {
                        alert(`Downloading: ${doc.title}\n(File content not available - document was uploaded before file storage was implemented)`);
                    }
                }
            }

            saveDocumentsToStorage(documents) {
                localStorage.setItem('municipalDocuments', JSON.stringify(documents));
            }

            viewDocument(docId) {
                const documents = this.getDocumentsFromStorage();
                const doc = documents.find(d => d.id === docId);
                
                if (!doc) {
                    alert('Document not found');
                    return;
                }

                const modalTitle = document.getElementById('modalTitle');
                const documentViewer = document.getElementById('documentViewer');
                
                modalTitle.textContent = doc.title;
                
                if (doc.fileContent) {
                    if (doc.fileType.startsWith('image/')) {
                        documentViewer.innerHTML = `<img src="${doc.fileContent}" alt="${doc.title}" />`;
                    } else if (doc.fileType === 'application/pdf') {
                        documentViewer.innerHTML = `<iframe src="${doc.fileContent}" type="application/pdf"></iframe>`;
                    } else if (doc.fileType.includes('text')) {
                        try {
                            const base64Data = doc.fileContent.split(',')[1];
                            const textContent = atob(base64Data);
                            documentViewer.innerHTML = `<pre style="white-space: pre-wrap; font-family: monospace;">${textContent}</pre>`;
                        } catch (e) {
                            documentViewer.innerHTML = '<p>Unable to display text content.</p>';
                        }
                    } else {
                        documentViewer.innerHTML = `
                            <div style="text-align: center; padding: 2rem;">
                                <h3>Preview not available</h3>
                                <p>This file type cannot be previewed in the browser.</p>
                                <p>File: ${doc.fileName}</p>
                                <p>Type: ${doc.fileType}</p>
                                <button class="download-btn" onclick="municipalPortal.downloadDocument('${doc.id}')" style="margin-top: 1rem;">
                                    📥 Download to View
                                </button>
                            </div>
                        `;
                    }
                } else {
                    documentViewer.innerHTML = '<p>File content not available - document was uploaded before file storage was implemented.</p>';
                }
                
                this.modal.style.display = 'block';
            }

            closeModal() {
                this.modal.style.display = 'none';
            }

            showMessage(message, type) {
                const messageClass = type === 'success' ? 'success-message' : 'error-message';
                this.messageContainer.innerHTML = `
                    <div class="${messageClass}">
                        ${message}
                    </div>
                `;
                
                setTimeout(() => {
                    this.messageContainer.innerHTML = '';
                }, 5000);
            }

            showNoSearchResults() {
                this.documentsContainer.innerHTML = `
                    <div class="empty-state">
                        <h3>No Documents Found</h3>
                        <p>No documents match your search criteria. Try different keywords or clear the search to see all documents.</p>
                    </div>
                `;
            }

            showEmptyState() {
                this.documentsContainer.innerHTML = `
                    <div class="empty-state">
                        <h3>No Documents Available</h3>
                        <p>No documents have been uploaded yet. Check back later or contact the administrator.</p>
                    </div>
                `;
            }

            // Utility functions
            formatFileSize(bytes) {
                if (!bytes || bytes === 0) return '0 B';
                const k = 1024;
                const sizes = ['B', 'KB', 'MB', 'GB'];
                const i = Math.floor(Math.log(bytes) / Math.log(k));
                return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
            }

            generateId() {
                return Date.now().toString(36) + Math.random().toString(36).substr(2);
            }

            formatDate(date) {
                return date.toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                });
            }
        }

        const municipalPortal = new MunicipalPortal();

        window.onclick = function(event) {
            const modal = document.getElementById('documentModal');
            if (event.target === modal) {
                municipalPortal.closeModal();
            }
        }