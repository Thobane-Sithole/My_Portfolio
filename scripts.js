/* === Extracted from: <script> === */
(function () {

      const projects = [

        {
          id: "#image-9d64c961",
          url: "https://www.kreatestudio.co/"
        },

        {
          id: "#image-f743599a",
          url: "https://www.designitpremium.com/"
        },

        {
          id: "#image-6192fc50",
          url: "https://codeylibrary.designitpremium.com/"
        },

        {
          id: "#image-d88b6024",
          url: "https://ipm.kmcre8tives.com/"
        },

        {
          id: "#image-833897a7",
          url: "https://infinite.kmcre8tives.com/"
        },

        {
          id: "#image-8f6f1100",
          url: "https://www.kathmejia.com/matrix"
        },

        {
          id: "#image-dc180b11",
          url: "https://www.kathmejia.com/f2f"
        },

        {
          id: "#image-e96383b1",
          url: "https://www.kathmejia.com/exclusive-emails"
        },

        {
          id: "#image-02f718a1",
          url: "https://www.kathmejia.com/infinite"
        },

        {
          id: "#image-628286df",
          url: "https://www.kathmejia.com/launchpad"
        },

        {
          id: "#image-002170b6",
          url: "https://www.kathmejia.com/closed"
        },

        {
          id: "#image-8582a7ef",
          url: "https://www.kathmejia.com/vip2026"
        },

        {
          id: "#image-d24f5d1e",
          url: "https://creatifybylihyanna.systeme.io/digital-success"
        },

        {
          id: "#image-7272e3e2",
          url: "https://www.kristineramirez.com/"
        },

        {
          id: "#image-93225606",
          url: "https://canva.link/magnica"
        }

      ];


      const cursor =
        document.getElementById(
          "yanz-project-cursor"
        );


      /* cursor follows mouse */

      document.addEventListener(
        "mousemove",
        function (event) {

          if (!cursor) return;

          cursor.style.left =
            event.clientX + "px";

          cursor.style.top =
            event.clientY + "px";

        }
      );


      function setupProjects() {

        projects.forEach(function (project) {

          const element =
            document.querySelector(project.id);

          if (!element) return;


          /* find actual image */

          const image =
            element.tagName &&
              element.tagName.toLowerCase() === "img"

              ? element

              : element.querySelector("img");


          if (!image) return;


          /*
          Use image's direct parent
          so effect stays around image only
          */

          const card =
            image.parentElement;


          if (!card) return;


          /* prevent duplicate setup */

          if (
            card.classList.contains(
              "yanz-project-card"
            )
          ) {

            return;

          }


          card.classList.add(
            "yanz-project-card"
          );

          image.classList.add(
            "yanz-project-img"
          );


          /* overlay */

          const overlay =
            document.createElement("div");

          overlay.className =
            "yanz-project-overlay";

          card.appendChild(overlay);


          /* =====================================
             SPOTLIGHT FOLLOW MOUSE
          ===================================== */

          card.addEventListener(
            "mousemove",
            function (event) {

              const rect =
                card.getBoundingClientRect();

              const x =
                event.clientX -
                rect.left;

              const y =
                event.clientY -
                rect.top;

              overlay.style.setProperty(
                "--mouse-x",
                x + "px"
              );

              overlay.style.setProperty(
                "--mouse-y",
                y + "px"
              );

            }
          );


          /* =====================================
             CURSOR SHOW
          ===================================== */

          card.addEventListener(
            "mouseenter",
            function () {

              if (!cursor) return;

              cursor.classList.add(
                "active"
              );

            }
          );


          /* =====================================
             CURSOR HIDE
          ===================================== */

          card.addEventListener(
            "mouseleave",
            function () {

              if (!cursor) return;

              cursor.classList.remove(
                "active"
              );

            }
          );


          /* =====================================
             CLICK PROJECT
          ===================================== */

          card.addEventListener(
            "click",
            function (event) {

              event.preventDefault();
              event.stopPropagation();

              window.open(
                project.url,
                "_blank",
                "noopener,noreferrer"
              );

            }
          );


          /* accessibility */

          card.setAttribute(
            "role",
            "link"
          );

          card.setAttribute(
            "tabindex",
            "0"
          );


          card.addEventListener(
            "keydown",
            function (event) {

              if (
                event.key === "Enter" ||
                event.key === " "
              ) {

                event.preventDefault();

                window.open(
                  project.url,
                  "_blank",
                  "noopener,noreferrer"
                );

              }

            }
          );

        });

      }


      if (
        document.readyState === "loading"
      ) {

        document.addEventListener(
          "DOMContentLoaded",
          setupProjects
        );

      } else {

        setupProjects();

      }


      /*
      Systeme sometimes loads elements late,
      so run again after a second.
      */

      setTimeout(
        setupProjects,
        1200
      );

    })();

/* === Extracted from: <script> === */
(function () {

      function buildPortfolioFolder() {

        const row =
          document.querySelector(
            "#row-5f91430f"
          );


        if (!row) {
          return;
        }


        /*
        Prevent duplicate folders
        if Systeme loads the script more than once.
        */

        if (
          row.closest(
            ".yanz-folder-shell"
          )
        ) {

          return;

        }


        /* =====================================
           CREATE MAIN FOLDER
        ===================================== */

        const shell =
          document.createElement(
            "div"
          );

        shell.className =
          "yanz-folder-shell at-top";


        /* =====================================
           CREATE RED TAB
        ===================================== */

        const tab =
          document.createElement(
            "div"
          );

        tab.className =
          "yanz-folder-tab";

        tab.innerHTML = `

      <span class="yanz-folder-dot">

      <span>
        PROJECT ARCHIVE
      

      <span class="yanz-folder-count">
        15 FILES
      

    `;


        /* =====================================
           TOP GRADIENT
        ===================================== */

        const topFade =
          document.createElement(
            "div"
          );

        topFade.className =
          "yanz-folder-top-fade";


        /* =====================================
           BOTTOM GRADIENT
        ===================================== */

        const bottomFade =
          document.createElement(
            "div"
          );

        bottomFade.className =
          "yanz-folder-bottom-fade";


        /* =====================================
           SCROLL HINT
        ===================================== */

        const hint =
          document.createElement(
            "div"
          );

        hint.className =
          "yanz-folder-scrollhint";

        hint.innerHTML =
          "SCROLL TO EXPLORE &darr;";


        /* =====================================
           WRAP EXISTING SYSTEME ROW
        ===================================== */

        row.parentNode.insertBefore(
          shell,
          row
        );


        shell.appendChild(
          tab
        );


        shell.appendChild(
          row
        );


        shell.appendChild(
          topFade
        );


        shell.appendChild(
          bottomFade
        );


        shell.appendChild(
          hint
        );


        /* =====================================
           SCROLL BEHAVIOR
        ===================================== */

        function updateFolderState() {

          const scrollTop =
            row.scrollTop;


          const maxScroll =
            row.scrollHeight -
            row.clientHeight;


          /* User has started scrolling */

          if (
            scrollTop > 30
          ) {

            shell.classList.add(
              "has-scrolled"
            );

          } else {

            shell.classList.remove(
              "has-scrolled"
            );

          }


          /* At very top */

          if (
            scrollTop <= 5
          ) {

            shell.classList.add(
              "at-top"
            );

          } else {

            shell.classList.remove(
              "at-top"
            );

          }


          /* At bottom */

          if (
            maxScroll - scrollTop <= 5
          ) {

            shell.classList.add(
              "at-bottom"
            );

          } else {

            shell.classList.remove(
              "at-bottom"
            );

          }

        }


        row.addEventListener(
          "scroll",
          updateFolderState,
          {
            passive: true
          }
        );


        updateFolderState();

      }


      /* =====================================
         INITIAL LOAD
      ===================================== */

      if (
        document.readyState ===
        "loading"
      ) {

        document.addEventListener(
          "DOMContentLoaded",
          buildPortfolioFolder
        );

      } else {

        buildPortfolioFolder();

      }


      /*
      Systeme sometimes renders elements
      slightly later.
      */

      setTimeout(
        buildPortfolioFolder,
        1000
      );


      setTimeout(
        buildPortfolioFolder,
        2000
      );

    })();

/* === Extracted from: <script> === */
(function () {

      function buildPortfolioFolder() {

        const row =
          document.querySelector(
            "#row-5f91430f"
          );


        if (!row) {
          return;
        }


        /*
        Prevent duplicate folders
        if Systeme loads the script more than once.
        */

        if (
          row.closest(
            ".yanz-folder-shell"
          )
        ) {

          return;

        }


        /* =====================================
           CREATE MAIN FOLDER
        ===================================== */

        const shell =
          document.createElement(
            "div"
          );

        shell.className =
          "yanz-folder-shell at-top";


        /* =====================================
           CREATE RED TAB
        ===================================== */

        const tab =
          document.createElement(
            "div"
          );

        tab.className =
          "yanz-folder-tab";

        tab.innerHTML = `

      <span class="yanz-folder-dot">

      <span>
        PROJECT ARCHIVE
      

      <span class="yanz-folder-count">
        15 FILES
      

    `;


        /* =====================================
           TOP GRADIENT
        ===================================== */

        const topFade =
          document.createElement(
            "div"
          );

        topFade.className =
          "yanz-folder-top-fade";


        /* =====================================
           BOTTOM GRADIENT
        ===================================== */

        const bottomFade =
          document.createElement(
            "div"
          );

        bottomFade.className =
          "yanz-folder-bottom-fade";


        /* =====================================
           SCROLL HINT
        ===================================== */

        const hint =
          document.createElement(
            "div"
          );

        hint.className =
          "yanz-folder-scrollhint";

        hint.innerHTML =
          "SCROLL TO EXPLORE &darr;";


        /* =====================================
           WRAP EXISTING SYSTEME ROW
        ===================================== */

        row.parentNode.insertBefore(
          shell,
          row
        );


        shell.appendChild(
          tab
        );


        shell.appendChild(
          row
        );


        shell.appendChild(
          topFade
        );


        shell.appendChild(
          bottomFade
        );


        shell.appendChild(
          hint
        );


        /* =====================================
           SCROLL BEHAVIOR
        ===================================== */

        function updateFolderState() {

          const scrollTop =
            row.scrollTop;


          const maxScroll =
            row.scrollHeight -
            row.clientHeight;


          /* User has started scrolling */

          if (
            scrollTop > 30
          ) {

            shell.classList.add(
              "has-scrolled"
            );

          } else {

            shell.classList.remove(
              "has-scrolled"
            );

          }


          /* At very top */

          if (
            scrollTop <= 5
          ) {

            shell.classList.add(
              "at-top"
            );

          } else {

            shell.classList.remove(
              "at-top"
            );

          }


          /* At bottom */

          if (
            maxScroll - scrollTop <= 5
          ) {

            shell.classList.add(
              "at-bottom"
            );

          } else {

            shell.classList.remove(
              "at-bottom"
            );

          }

        }


        row.addEventListener(
          "scroll",
          updateFolderState,
          {
            passive: true
          }
        );


        updateFolderState();

      }


      /* =====================================
         INITIAL LOAD
      ===================================== */

      if (
        document.readyState ===
        "loading"
      ) {

        document.addEventListener(
          "DOMContentLoaded",
          buildPortfolioFolder
        );

      } else {

        buildPortfolioFolder();

      }


      /*
      Systeme sometimes renders elements
      slightly later.
      */

      setTimeout(
        buildPortfolioFolder,
        1000
      );


      setTimeout(
        buildPortfolioFolder,
        2000
      );

    })();

/* === Extracted from: <script> === */
(function () {


      /* =====================================================
         YOUR SYSTEME.IO ROW IDS
      ====================================================== */

      const ROW_IDS = [

        "row-bdfb1be0",

        "row-2f300d7d",

        "row-bf103430",

        "row-9cbc6101",

        "row-0967892c",

        "row-56cbbb5b"

      ];


      /*
        Distance of timeline from
        LEFT SIDE of roadmap.
    
        Bigger number =
        farther to the left.
      */

      const LINE_GAP =
        55;



      let rows =
        [];


      let timeline =
        null;


      let fill =
        null;


      let dot =
        null;


      let initialized =
        false;


      let ticking =
        false;



      /* =====================================================
         REMOVE OLD ROADMAP EFFECTS
         Helps if previous code left classes/elements behind.
      ====================================================== */

      function cleanupOldEffects() {


        const oldElements = [

          "yz-process-line",

          "yz-process-track",

          "yanz-process-progress",

          "yanz-footstep-road"

        ];


        oldElements.forEach(
          function (id) {

            const element =
              document.getElementById(
                id
              );


            if (element) {

              element.remove();

            }

          }
        );


        ROW_IDS.forEach(
          function (id) {

            const row =
              document.getElementById(
                id
              );


            if (!row) {

              return;

            }


            row.classList.remove(

              "yz-process-ready",

              "yz-revealed",

              "yz-active",

              "yz-past",

              "yanz-process-step",

              "yanz-step-visible",

              "yanz-step-active",

              "yanz-step-past",

              "yanz-roadmap-step",

              "yanz-step-revealed",

              "yanz-step-passed",

              "yanz-walk-step",

              "yanz-arrived"

            );

          }
        );

      }



      /* =====================================================
         CREATE TIMELINE
      ====================================================== */

      function createTimeline() {


        const existing =
          document.getElementById(
            "krt-process-line"
          );


        if (existing) {

          existing.remove();

        }


        timeline =
          document.createElement(
            "div"
          );


        timeline.id =
          "krt-process-line";



        fill =
          document.createElement(
            "div"
          );


        fill.id =
          "krt-process-fill";



        dot =
          document.createElement(
            "div"
          );


        dot.id =
          "krt-process-dot";



        timeline.appendChild(
          fill
        );


        timeline.appendChild(
          dot
        );


        document.body.appendChild(
          timeline
        );

      }



      /* =====================================================
         POSITION TIMELINE
      ====================================================== */

      function positionTimeline() {


        if (
          !timeline ||
          rows.length !== 6
        ) {

          return;

        }


        const firstRect =
          rows[0]
            .getBoundingClientRect();


        const lastRect =
          rows[5]
            .getBoundingClientRect();



        /*
          Timeline goes OUTSIDE
          the left edge of the row.
        */

        let left =
          firstRect.left +
          window.scrollX -
          LINE_GAP;



        /*
          Prevent it from disappearing
          outside viewport.
        */

        left =
          Math.max(
            18,
            left
          );



        const top =
          firstRect.top +
          window.scrollY +
          (
            firstRect.height *
            .50
          );


        const bottom =
          lastRect.top +
          window.scrollY +
          (
            lastRect.height *
            .50
          );


        timeline.style.left =
          left +
          "px";


        timeline.style.top =
          top +
          "px";


        timeline.style.height =
          Math.max(
            100,
            bottom - top
          ) +
          "px";

      }



      /* =====================================================
         FIND ACTIVE STEP
      ====================================================== */

      function getActiveIndex() {


        const focusPoint =
          window.innerHeight *
          .50;


        let activeIndex =
          0;


        let smallestDistance =
          Infinity;



        rows.forEach(
          function (row, index) {


            const rect =
              row.getBoundingClientRect();


            const center =
              rect.top +
              (
                rect.height /
                2
              );


            const distance =
              Math.abs(
                center -
                focusPoint
              );



            /*
              Prioritize rows reasonably
              close to viewport.
            */

            if (

              rect.bottom >
              -window.innerHeight * .25

              &&

              rect.top <
              window.innerHeight * 1.25

            ) {


              if (
                distance <
                smallestDistance
              ) {


                smallestDistance =
                  distance;


                activeIndex =
                  index;

              }

            }

          }
        );


        return activeIndex;

      }



      /* =====================================================
         UPDATE FOCUS EFFECT
      ====================================================== */

      function updateFocus() {


        ticking =
          false;


        if (
          rows.length !== 6
        ) {

          return;

        }



        const activeIndex =
          getActiveIndex();



        /* =================================================
           ASSIGN STEP STATES
        ================================================= */

        rows.forEach(
          function (row, index) {


            row.classList.remove(

              "krt-active",

              "krt-past",

              "krt-future"

            );



            if (
              index <
              activeIndex
            ) {


              row.classList.add(
                "krt-past"
              );


            } else if (
              index ===
              activeIndex
            ) {


              row.classList.add(
                "krt-active"
              );


            } else {


              row.classList.add(
                "krt-future"
              );

            }

          }
        );



        /* =================================================
           CONTINUOUS TIMELINE PROGRESS
        ================================================= */

        if (
          timeline &&
          fill &&
          dot
        ) {


          const lineRect =
            timeline
              .getBoundingClientRect();


          const lineTop =
            lineRect.top +
            window.scrollY;


          const lineHeight =
            lineRect.height;



          /*
            Virtual progress point
            sits around center of screen.
          */

          const marker =
            window.scrollY +
            (
              window.innerHeight *
              .50
            );



          let progress =
            (
              marker -
              lineTop
            ) /
            lineHeight;



          progress =
            Math.max(
              0,
              Math.min(
                1,
                progress
              )
            );



          const percentage =
            progress *
            100;



          fill.style.height =
            percentage +
            "%";


          dot.style.top =
            percentage +
            "%";

        }

      }



      /* =====================================================
         REQUEST ANIMATION FRAME
      ====================================================== */

      function requestUpdate() {


        if (ticking) {

          return;

        }


        ticking =
          true;


        window.requestAnimationFrame(
          updateFocus
        );

      }



      /* =====================================================
         INITIALIZE
      ====================================================== */

      function initialize() {


        if (initialized) {

          return true;

        }



        const foundRows =
          ROW_IDS.map(
            function (id) {

              return document.getElementById(
                id
              );

            }
          );



        /*
          Don't start until ALL
          six Systeme rows exist.
        */

        if (
          foundRows.some(
            function (row) {

              return !row;

            }
          )
        ) {


          return false;

        }



        rows =
          foundRows;



        cleanupOldEffects();



        /*
          Add our new focus class.
        */

        rows.forEach(
          function (row) {

            row.classList.add(
              "krt-focus-step"
            );

          }
        );



        createTimeline();


        positionTimeline();


        updateFocus();



        /* =================================================
           SCROLL
        ================================================= */

        window.addEventListener(

          "scroll",

          requestUpdate,

          {
            passive:
              true
          }

        );



        /* =================================================
           RESIZE
        ================================================= */

        window.addEventListener(

          "resize",

          function () {


            positionTimeline();


            requestUpdate();

          }

        );



        /*
          Recalculate once fonts,
          sections, and images settle.
        */

        setTimeout(

          function () {


            positionTimeline();


            updateFocus();

          },

          400

        );



        setTimeout(

          function () {


            positionTimeline();


            updateFocus();

          },

          1200

        );



        initialized =
          true;


        return true;

      }



      /* =====================================================
         SYSTEME.IO SAFE LOADER
      ====================================================== */

      function start() {


        let attempts =
          0;



        const timer =
          setInterval(

            function () {


              attempts++;



              if (

                initialize()

                ||

                attempts >= 60

              ) {


                clearInterval(
                  timer
                );

              }

            },

            200

          );

      }



      /* =====================================================
         RUN
      ====================================================== */

      if (

        document.readyState ===
        "loading"

      ) {


        document.addEventListener(

          "DOMContentLoaded",

          start

        );


      } else {


        start();

      }


    })();

/* === Extracted from: <script> === */
(function () {

      function buildProcessBackground() {

        const section =
          document.getElementById(
            "section-a5abdf61"
          );


        if (!section) {
          return false;
        }


        /* Prevent duplicates */

        if (
          section.querySelector(
            ".krt-process-bg"
          )
        ) {
          return true;
        }


        /* =========================================
           BACKGROUND
        ========================================= */

        const background =
          document.createElement("div");

        background.className =
          "krt-process-bg";


        /* =========================================
           GRID
        ========================================= */

        const grid =
          document.createElement("div");

        grid.className =
          "krt-process-grid";


        /* =========================================
           GRAIN
        ========================================= */

        const grain =
          document.createElement("div");

        grain.className =
          "krt-process-grain";


        /* =========================================
           EDGE FADE
        ========================================= */

        const vignette =
          document.createElement("div");

        vignette.className =
          "krt-process-vignette";


        /* Put effects at beginning of section */

        section.prepend(
          vignette
        );

        section.prepend(
          grain
        );

        section.prepend(
          grid
        );

        section.prepend(
          background
        );


        /* Force section itself */

        section.style.setProperty(
          "position",
          "relative",
          "important"
        );

        section.style.setProperty(
          "isolation",
          "isolate",
          "important"
        );

        section.style.setProperty(
          "background-color",
          "#fbf8f7",
          "important"
        );


        return true;

      }


      /* =====================================================
         SYSTEME.IO SAFE LOADING
      ====================================================== */

      function start() {

        let attempts = 0;


        const timer =
          setInterval(
            function () {

              attempts++;


              if (
                buildProcessBackground()
                ||
                attempts >= 50
              ) {

                clearInterval(
                  timer
                );

              }

            },

            200
          );

      }


      if (
        document.readyState ===
        "loading"
      ) {

        document.addEventListener(
          "DOMContentLoaded",
          start
        );

      } else {

        start();

      }

    })();

/* === Extracted from: <script> === */
(function () {

      function buildSectionBackground2() {
        const section = document.getElementById("section-f36f571e");
        if (!section) return false;

        if (section.querySelector(".krt-bg-layer-2")) {
          return true;
        }

        const background = document.createElement("div");
        background.className = "krt-bg-layer-2";

        const grid = document.createElement("div");
        grid.className = "krt-grid-layer-2";

        const grain = document.createElement("div");
        grain.className = "krt-grain-layer-2";

        const vignette = document.createElement("div");
        vignette.className = "krt-vignette-layer-2";

        section.prepend(vignette);
        section.prepend(grain);
        section.prepend(grid);
        section.prepend(background);

        section.style.setProperty("position", "relative", "important");
        section.style.setProperty("isolation", "isolate", "important");
        section.style.setProperty("background-color", "#fbf8f7", "important");

        return true;
      }

      function start() {
        let attempts = 0;

        const timer = setInterval(function () {
          attempts++;

          if (buildSectionBackground2() || attempts >= 50) {
            clearInterval(timer);
          }
        }, 200);
      }

      if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", start);
      } else {
        start();
      }

    })();

/* === Extracted from: <script> === */
(function () {

      function setupYanzCounter() {

        const counter =
          document.getElementById(
            "yanz-countup-50"
          );

        const number =
          document.getElementById(
            "yanz-countup-number"
          );

        if (
          !counter ||
          !number
        ) {

          return false;

        }


        /*
          Prevent duplicate setup
        */

        if (
          counter.dataset.counterReady ===
          "true"
        ) {

          return true;

        }


        counter.dataset.counterReady =
          "true";


        const target =
          50;


        /*
          Total animation time.
    
          2000 = 2 seconds
        */

        const duration =
          2000;


        let started =
          false;



        /* =====================================
           COUNT FUNCTION
        ===================================== */

        function startCounting() {

          if (started) {

            return;

          }


          started =
            true;


          const startTime =
            performance.now();



          function animate(currentTime) {

            const elapsed =
              currentTime -
              startTime;


            let progress =
              elapsed /
              duration;


            progress =
              Math.min(
                progress,
                1
              );


            /*
              Ease-out.
    
              Fast-ish at first,
              slower as it approaches 50.
            */

            const eased =
              1 -
              Math.pow(
                1 - progress,
                3
              );


            const currentNumber =
              Math.floor(
                eased *
                target
              );


            number.textContent =
              currentNumber;



            if (
              progress <
              1
            ) {

              requestAnimationFrame(
                animate
              );


            } else {


              number.textContent =
                "50";


              counter.classList.add(
                "yanz-counter-finished"
              );

            }

          }


          requestAnimationFrame(
            animate
          );

        }



        /* =====================================
           START ONLY WHEN USER REACHES IT
        ===================================== */

        const observer =
          new IntersectionObserver(

            function (entries) {

              entries.forEach(
                function (entry) {

                  if (
                    entry.isIntersecting &&
                    !started
                  ) {

                    /*
                      Small delay so user
                      actually sees the 0 first.
                    */

                    setTimeout(
                      startCounting,
                      180
                    );


                    observer.disconnect();

                  }

                }
              );

            },

            {

              /*
                Counter must be around
                35% visible before starting.
              */

              threshold:
                0.35

            }

          );


        observer.observe(
          counter
        );


        return true;

      }



      /* =====================================
         SYSTEME.IO SAFE LOADING
      ===================================== */

      function start() {

        let attempts =
          0;


        const timer =
          setInterval(

            function () {

              attempts++;


              if (
                setupYanzCounter()
                ||
                attempts >= 50
              ) {

                clearInterval(
                  timer
                );

              }

            },

            200

          );

      }


      if (
        document.readyState ===
        "loading"
      ) {

        document.addEventListener(
          "DOMContentLoaded",
          start
        );


      } else {


        start();

      }

    })();

/* === Extracted from: <script> === */
(function () {

      const IMAGES = [

        "https://i.imgur.com/sYlfT8B.jpg",
        "https://i.imgur.com/8ZY4wpu.jpg",
        "https://i.imgur.com/Vfb9krQ.jpg",
        "https://i.imgur.com/VAJUemZ.jpg",
        "https://i.imgur.com/983Yn3R.jpg",
        "https://i.imgur.com/Oy8ddOh.jpg",
        "https://i.imgur.com/AqA1bVh.jpg",
        "https://i.imgur.com/jBZOGGE.jpg",
        "https://i.imgur.com/gMKMApD.jpg",
        "https://i.imgur.com/ZzNmSrK.jpg",
        "https://i.imgur.com/a0r8E6q.jpg",
        "https://i.imgur.com/479PGR2.jpg",
        "https://i.imgur.com/xcFiPoY.jpg",
        "https://i.imgur.com/Uf6aOQZ.jpg",
        "https://i.imgur.com/N34O2u5.jpg",
        "https://i.imgur.com/sr0WIKw.jpg",
        "https://i.imgur.com/nT3bmax.jpg"

      ];


      let initialized = false;


      function setupMemoryMontage() {

        if (initialized) return true;

        const montage = document.getElementById("krt-memory-montage");
        const imageA = document.getElementById("krt-memory-img-a");
        const imageB = document.getElementById("krt-memory-img-b");
        const background = document.getElementById("krt-memory-bg");

        if (!montage || !imageA || !imageB || !background) {
          return false;
        }

        initialized = true;

        /* mas mabilis na pacing */
        const IMAGE_DURATION = 820;
        const CROSSFADE_TIME = 320;

        let currentIndex = 0;
        let currentImage = imageA;
        let nextImage = imageB;
        let motionIndex = 1;
        let timer = null;
        let running = false;

        IMAGES.forEach(function (src) {
          const preload = new Image();
          preload.src = src;
        });

        function applyMotion(element) {
          element.classList.remove(
            "krt-motion-1",
            "krt-motion-2",
            "krt-motion-3",
            "krt-motion-4"
          );

          void element.offsetWidth;

          element.classList.add("krt-motion-" + motionIndex);

          motionIndex++;
          if (motionIndex > 4) {
            motionIndex = 1;
          }
        }

        function changeImage() {
          if (!running) return;

          currentIndex = (currentIndex + 1) % IMAGES.length;
          const newSrc = IMAGES[currentIndex];

          nextImage.src = newSrc;

          nextImage.onload = function () {
            if (!running) return;

            applyMotion(nextImage);

            nextImage.classList.add("krt-visible");

            background.style.opacity = ".45";

            setTimeout(function () {
              background.src = newSrc;
              background.style.opacity = ".82";
            }, 120);

            setTimeout(function () {
              currentImage.classList.remove("krt-visible");
            }, 70);

            setTimeout(function () {
              const oldCurrent = currentImage;
              currentImage = nextImage;
              nextImage = oldCurrent;
            }, CROSSFADE_TIME);
          };
        }

        function startMontage() {
          if (running) return;

          running = true;
          applyMotion(currentImage);

          timer = setInterval(
            changeImage,
            IMAGE_DURATION
          );
        }

        function stopMontage() {
          running = false;

          if (timer) {
            clearInterval(timer);
            timer = null;
          }
        }

        const observer = new IntersectionObserver(
          function (entries) {
            entries.forEach(function (entry) {
              if (entry.isIntersecting) {
                startMontage();
              } else {
                stopMontage();
              }
            });
          },
          {
            threshold: 0.25
          }
        );

        observer.observe(montage);

        return true;
      }


      function start() {
        let attempts = 0;

        const loader = setInterval(function () {
          attempts++;

          if (setupMemoryMontage() || attempts >= 50) {
            clearInterval(loader);
          }
        }, 200);
      }

      if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", start);
      } else {
        start();
      }

    })();

/* === Extracted from: <script> === */
(function () {

      function setupRevenueCounter() {

        const counter =
          document.getElementById(
            "yanz-revenue-counter"
          );


        if (!counter) {
          return false;
        }


        /* prevent duplicate setup */

        if (
          counter.dataset.ready ===
          "true"
        ) {
          return true;
        }


        counter.dataset.ready =
          "true";


        const TARGET =
          100;


        const DURATION =
          2000;


        let started =
          false;



        function startCounting() {

          if (started) {
            return;
          }


          started =
            true;


          const startTime =
            performance.now();



          function animate(now) {

            const elapsed =
              now -
              startTime;


            let progress =
              elapsed /
              DURATION;


            progress =
              Math.min(
                progress,
                1
              );


            /*
              Smooth:
              fast at first,
              slows near 100
            */

            const eased =
              1 -
              Math.pow(
                1 - progress,
                3
              );


            const value =
              Math.floor(
                eased *
                TARGET
              );


            /*
              ONE STRING ONLY
              = perfect spacing
            */

            counter.textContent =
              "$" +
              value +
              "K";


            if (
              progress <
              1
            ) {

              requestAnimationFrame(
                animate
              );

            } else {

              counter.textContent =
                "$100K+";


              counter.classList.add(
                "yanz-done"
              );

            }

          }


          requestAnimationFrame(
            animate
          );

        }



        /* =====================================
           ONLY START WHEN USER SEES IT
        ===================================== */

        const observer =
          new IntersectionObserver(

            function (entries) {

              entries.forEach(
                function (entry) {

                  if (
                    entry.isIntersecting &&
                    !started
                  ) {

                    /*
                      tiny delay so makita muna
                      yung $0K
                    */

                    setTimeout(
                      startCounting,
                      180
                    );


                    observer.disconnect();

                  }

                }
              );

            },

            {
              threshold:
                0.35
            }

          );


        observer.observe(
          counter
        );


        return true;

      }



      /* SYSTEME.IO SAFE LOADING */

      function start() {

        let attempts =
          0;


        const timer =
          setInterval(

            function () {

              attempts++;


              if (
                setupRevenueCounter() ||
                attempts >= 50
              ) {

                clearInterval(
                  timer
                );

              }

            },

            200

          );

      }


      if (
        document.readyState ===
        "loading"
      ) {

        document.addEventListener(
          "DOMContentLoaded",
          start
        );

      } else {

        start();

      }

    })();

/* === Extracted from: <script> === */
(function () {

      const IMAGES = [

        "https://i.imgur.com/slZ0q4U.jpg",

        "https://i.imgur.com/jri9gz8.jpg",

        "https://i.imgur.com/Hxfq8xo.jpg",

        "https://i.imgur.com/UMY6ZVZ.jpg",

        "https://i.imgur.com/eoeZFvC.jpg",

        "https://i.imgur.com/jUDXjCu.jpg"

      ];


      let initialized = false;


      function setupMemoryMontage() {

        if (initialized) {
          return true;
        }


        const montage =
          document.getElementById(
            "krt-memory-montage"
          );


        const imageA =
          document.getElementById(
            "krt-memory-img-a"
          );


        const imageB =
          document.getElementById(
            "krt-memory-img-b"
          );


        const background =
          document.getElementById(
            "krt-memory-bg"
          );


        if (
          !montage ||
          !imageA ||
          !imageB ||
          !background
        ) {

          return false;

        }


        initialized = true;



        /* =====================================
           SPEED
        ===================================== */

        const IMAGE_DURATION =
          820;


        const CROSSFADE_TIME =
          320;



        let currentIndex =
          0;


        let currentImage =
          imageA;


        let nextImage =
          imageB;


        let motionIndex =
          1;


        let timer =
          null;


        let running =
          false;



        /* =====================================
           PRELOAD
        ===================================== */

        IMAGES.forEach(
          function (src) {

            const preload =
              new Image();


            preload.src =
              src;

          }
        );



        /* =====================================
           MOTION
        ===================================== */

        function applyMotion(
          element
        ) {

          element.classList.remove(

            "krt-motion-1",

            "krt-motion-2",

            "krt-motion-3",

            "krt-motion-4"

          );


          void element.offsetWidth;


          element.classList.add(
            "krt-motion-" +
            motionIndex
          );


          motionIndex++;


          if (
            motionIndex > 4
          ) {

            motionIndex =
              1;

          }

        }



        /* =====================================
           NEXT IMAGE
        ===================================== */

        function changeImage() {

          if (!running) {
            return;
          }


          currentIndex =
            (
              currentIndex + 1
            ) %
            IMAGES.length;


          const newSrc =
            IMAGES[currentIndex];


          nextImage.src =
            newSrc;



          nextImage.onload =
            function () {


              if (!running) {
                return;
              }


              applyMotion(
                nextImage
              );


              /* fade new image in */

              nextImage.classList.add(
                "krt-visible"
              );


              /* blurred background changes too */

              background.style.opacity =
                ".45";


              setTimeout(
                function () {

                  background.src =
                    newSrc;


                  background.style.opacity =
                    ".82";

                },
                120
              );


              /* fade old image */

              setTimeout(
                function () {

                  currentImage.classList.remove(
                    "krt-visible"
                  );

                },
                70
              );


              /* swap image layers */

              setTimeout(
                function () {

                  const oldCurrent =
                    currentImage;


                  currentImage =
                    nextImage;


                  nextImage =
                    oldCurrent;

                },
                CROSSFADE_TIME
              );

            };

        }



        /* =====================================
           START
        ===================================== */

        function startMontage() {

          if (running) {
            return;
          }


          running =
            true;


          applyMotion(
            currentImage
          );


          timer =
            setInterval(
              changeImage,
              IMAGE_DURATION
            );

        }



        /* =====================================
           PAUSE
        ===================================== */

        function stopMontage() {

          running =
            false;


          if (timer) {

            clearInterval(
              timer
            );


            timer =
              null;

          }

        }



        /* =====================================
           ONLY RUN WHEN VISIBLE
        ===================================== */

        const observer =
          new IntersectionObserver(

            function (entries) {

              entries.forEach(
                function (entry) {

                  if (
                    entry.isIntersecting
                  ) {

                    startMontage();

                  } else {

                    stopMontage();

                  }

                }
              );

            },

            {
              threshold:
                .25
            }

          );


        observer.observe(
          montage
        );


        return true;

      }



      /* =====================================
         SYSTEME.IO SAFE LOADER
      ===================================== */

      function start() {

        let attempts =
          0;


        const loader =
          setInterval(

            function () {

              attempts++;


              if (
                setupMemoryMontage() ||
                attempts >= 50
              ) {

                clearInterval(
                  loader
                );

              }

            },

            200

          );

      }


      if (
        document.readyState ===
        "loading"
      ) {

        document.addEventListener(
          "DOMContentLoaded",
          start
        );

      } else {

        start();

      }

    })();

/* === Extracted from: <script> === */
(function () {

      /* =====================================================
         SETTINGS
      ====================================================== */

      const IMAGE_DURATION =
        780;


      const CROSSFADE_TIME =
        260;



      /* =====================================================
         BUILD ONE MONTAGE
      ====================================================== */

      function buildMontage(
        montage
      ) {

        if (
          montage.dataset.mounted ===
          "true"
        ) {

          return;

        }


        const rawImages =
          montage.getAttribute(
            "data-images"
          );


        if (!rawImages) {

          return;

        }


        const imageIds =
          rawImages
            .split(",")
            .map(
              function (item) {

                return item.trim();

              }
            )
            .filter(Boolean);


        if (!imageIds.length) {

          return;

        }


        const images =
          imageIds.map(
            function (id) {

              return (
                "https://i.imgur.com/" +
                id +
                ".jpg"
              );

            }
          );


        montage.dataset.mounted =
          "true";


        /* =================================================
           CREATE HTML INTERNALLY
        ================================================= */

        montage.innerHTML = `

      <div class="krt-v2-frame">

        <img
          class="krt-v2-bg"
          src="${images[0]}"
          alt=""
        >

        <img
          class="krt-v2-photo krt-v2-image-a is-visible"
          src="${images[0]}"
          alt=""
        >

        <img
          class="krt-v2-photo krt-v2-image-b"
          src="${images[1] || images[0]}"
          alt=""
        >

        <div class="krt-v2-side krt-v2-side-left">

        <div class="krt-v2-side krt-v2-side-right">

        <div class="krt-v2-overlay">

        <div class="krt-v2-grain">

      

    `;


        const background =
          montage.querySelector(
            ".krt-v2-bg"
          );


        const imageA =
          montage.querySelector(
            ".krt-v2-image-a"
          );


        const imageB =
          montage.querySelector(
            ".krt-v2-image-b"
          );


        let currentImage =
          imageA;


        let nextImage =
          imageB;


        let currentIndex =
          0;


        let motionIndex =
          1;


        let timer =
          null;


        let running =
          false;


        let changing =
          false;



        /* =================================================
           PRELOAD ALL IMAGES
        ================================================= */

        images.forEach(
          function (src) {

            const preload =
              new Image();


            preload.src =
              src;

          }
        );



        /* =================================================
           MOTION
        ================================================= */

        function applyMotion(
          image
        ) {

          image.classList.remove(

            "motion-1",

            "motion-2",

            "motion-3",

            "motion-4"

          );


          void image.offsetWidth;


          image.classList.add(
            "motion-" +
            motionIndex
          );


          motionIndex++;


          if (
            motionIndex > 4
          ) {

            motionIndex =
              1;

          }

        }



        /* =================================================
           SCHEDULE NEXT IMAGE
        ================================================= */

        function scheduleNext() {

          if (!running) {

            return;

          }


          clearTimeout(
            timer
          );


          timer =
            setTimeout(
              changeImage,
              IMAGE_DURATION
            );

        }



        /* =================================================
           CHANGE IMAGE
        ================================================= */

        function changeImage() {

          if (
            !running ||
            changing
          ) {

            return;

          }


          changing =
            true;


          currentIndex =
            (
              currentIndex + 1
            ) %
            images.length;


          const newSrc =
            images[
            currentIndex
            ];


          let loaded =
            false;


          function showLoadedImage() {

            if (loaded) {

              return;

            }


            loaded =
              true;


            if (!running) {

              changing =
                false;

              return;

            }


            applyMotion(
              nextImage
            );


            nextImage
              .classList
              .add(
                "is-visible"
              );


            background.style.opacity =
              ".40";


            setTimeout(
              function () {

                background.src =
                  newSrc;


                background.style.opacity =
                  ".82";

              },

              90
            );


            setTimeout(
              function () {

                currentImage
                  .classList
                  .remove(
                    "is-visible"
                  );

              },

              45
            );


            setTimeout(
              function () {

                const oldCurrent =
                  currentImage;


                currentImage =
                  nextImage;


                nextImage =
                  oldCurrent;


                changing =
                  false;


                scheduleNext();

              },

              CROSSFADE_TIME
            );

          }


          nextImage.onload =
            showLoadedImage;


          nextImage.src =
            newSrc;


          if (
            nextImage.complete &&
            nextImage.naturalWidth > 0
          ) {

            showLoadedImage();

          }

        }



        /* =================================================
           START
        ================================================= */

        function startMontage() {

          if (running) {

            return;

          }


          running =
            true;


          applyMotion(
            currentImage
          );


          scheduleNext();

        }



        /* =================================================
           PAUSE
        ================================================= */

        function stopMontage() {

          running =
            false;


          clearTimeout(
            timer
          );


          timer =
            null;

        }



        /* =================================================
           VIEWPORT OBSERVER
        ================================================= */

        const observer =
          new IntersectionObserver(

            function (entries) {

              entries.forEach(
                function (entry) {

                  if (
                    entry.isIntersecting
                  ) {

                    startMontage();

                  } else {

                    stopMontage();

                  }

                }
              );

            },

            {
              threshold:
                .20
            }

          );


        observer.observe(
          montage
        );

      }



      /* =====================================================
         FIND AND BUILD ALL MONTAGES
      ====================================================== */

      function initializeAllMontages() {

        const montages =
          document.querySelectorAll(
            ".krt-memory-montage-v2"
          );


        if (!montages.length) {

          return false;

        }


        montages.forEach(
          function (montage) {

            buildMontage(
              montage
            );

          }
        );


        return true;

      }



      /* =====================================================
         SYSTEME SAFE LOADER
      ====================================================== */

      function start() {

        let attempts =
          0;


        const loader =
          setInterval(

            function () {

              attempts++;


              if (
                initializeAllMontages()
                ||
                attempts >= 60
              ) {

                clearInterval(
                  loader
                );

              }

            },

            200

          );

      }


      if (
        document.readyState ===
        "loading"
      ) {

        document.addEventListener(
          "DOMContentLoaded",
          start
        );

      } else {

        start();

      }

    })();

/* === Extracted from: <script> === */
(function () {

      function setup3Counter() {

        const counter =
          document.getElementById("yanz-countup-3");

        const number =
          document.getElementById("yanz-countup-number-3");

        if (!counter || !number) {
          return false;
        }

        if (counter.dataset.ready === "true") {
          return true;
        }

        counter.dataset.ready = "true";

        const TARGET = 3;
        const DURATION = 1100;

        let started = false;


        function startCounting() {

          if (started) return;

          started = true;

          const startTime =
            performance.now();


          function animate(now) {

            const elapsed =
              now - startTime;

            let progress =
              Math.min(
                elapsed / DURATION,
                1
              );

            const eased =
              1 - Math.pow(1 - progress, 3);

            const value =
              Math.min(
                TARGET,
                Math.floor(
                  eased * TARGET
                )
              );

            number.textContent =
              value;


            if (progress < 1) {

              requestAnimationFrame(
                animate
              );

            } else {

              number.textContent =
                "3";

              counter.classList.add(
                "yanz-counter-finished"
              );

            }

          }


          requestAnimationFrame(
            animate
          );

        }


        const observer =
          new IntersectionObserver(

            function (entries) {

              entries.forEach(
                function (entry) {

                  if (
                    entry.isIntersecting &&
                    !started
                  ) {

                    setTimeout(
                      startCounting,
                      150
                    );

                    observer.disconnect();

                  }

                }
              );

            },

            {
              threshold: .35
            }

          );


        observer.observe(
          counter
        );

        return true;

      }


      function start() {

        let attempts = 0;

        const timer =
          setInterval(
            function () {

              attempts++;

              if (
                setup3Counter() ||
                attempts >= 50
              ) {

                clearInterval(timer);

              }

            },
            200
          );

      }


      if (
        document.readyState === "loading"
      ) {

        document.addEventListener(
          "DOMContentLoaded",
          start
        );

      } else {

        start();

      }

    })();

/* === Extracted from: <script> === */
(function () {

      function setupProofCarousel() {

        const carousel =
          document.getElementById(
            "krt-testimonial-carousel"
          );


        if (!carousel) {
          return false;
        }


        if (
          carousel.dataset.ready ===
          "true"
        ) {
          return true;
        }


        carousel.dataset.ready =
          "true";



        /* =====================================
           INJECT LAYOUT FIXES
           - no cut side cards
           - controls closer
        ===================================== */

        const style =
          document.createElement(
            "style"
          );


        style.textContent = `

      /* =====================================
         ALLOW SIDE CARDS TO SHOW
      ===================================== */

      #krt-testimonial-carousel {
        overflow: visible !important;
      }


      #krt-testimonial-carousel .krt-proof-stage {
        overflow: visible !important;

        /* shorter stage = controls closer */
        height: 400px !important;

        max-width: 980px !important;

        padding-left: 55px !important;
        padding-right: 55px !important;

        box-sizing: border-box !important;
      }


      /* =====================================
         SIDE CARDS
         Pull them slightly inward so
         they're fully visible
      ===================================== */

      #krt-testimonial-carousel
      .krt-proof-card.is-prev {

        opacity: .62 !important;

        transform:
          translate(
            calc(-50% - 205px),
            calc(-50% + 12px)
          )
          rotate(-5deg)
          scale(.84) !important;

      }


      #krt-testimonial-carousel
      .krt-proof-card.is-next {

        opacity: .62 !important;

        transform:
          translate(
            calc(-50% + 205px),
            calc(-50% + 12px)
          )
          rotate(5deg)
          scale(.84) !important;

      }


      /* =====================================
         CONTROLS CLOSER TO CARDS
      ===================================== */

      #krt-testimonial-carousel
      .krt-proof-controls {

        margin-top: -16px !important;

        position: relative !important;

        z-index: 30 !important;

      }


      /* =====================================
         MOBILE
      ===================================== */

      @media (max-width: 767px) {

        #krt-testimonial-carousel
        .krt-proof-stage {

          height: 345px !important;

          padding-left: 15px !important;
          padding-right: 15px !important;

          overflow: visible !important;

        }


        #krt-testimonial-carousel
        .krt-proof-card {

          width: 82% !important;

        }


        #krt-testimonial-carousel
        .krt-proof-card.is-prev {

          opacity: .34 !important;

          transform:
            translate(
              calc(-50% - 95px),
              calc(-50% + 7px)
            )
            rotate(-5deg)
            scale(.82) !important;

        }


        #krt-testimonial-carousel
        .krt-proof-card.is-next {

          opacity: .34 !important;

          transform:
            translate(
              calc(-50% + 95px),
              calc(-50% + 7px)
            )
            rotate(5deg)
            scale(.82) !important;

        }


        #krt-testimonial-carousel
        .krt-proof-controls {

          margin-top: -10px !important;

        }

      }

    `;


        document.head.appendChild(
          style
        );



        /* =====================================
           SYSTEME WRAPPER FIX
    
           Some Systeme containers use
           overflow:hidden, which can still
           crop our cards even when the
           carousel itself is overflow:visible.
        ===================================== */

        let parent =
          carousel.parentElement;


        let parentLevel =
          0;


        while (
          parent &&
          parent !== document.body &&
          parentLevel < 5
        ) {

          parent.style.setProperty(
            "overflow",
            "visible",
            "important"
          );


          parent =
            parent.parentElement;


          parentLevel++;

        }



        /* =====================================
           GET CAROUSEL ELEMENTS
        ===================================== */

        const cards =
          Array.from(
            carousel.querySelectorAll(
              ".krt-proof-card"
            )
          );


        const prevButton =
          carousel.querySelector(
            ".krt-proof-prev"
          );


        const nextButton =
          carousel.querySelector(
            ".krt-proof-next"
          );


        const counter =
          carousel.querySelector(
            ".krt-proof-current"
          );


        if (!cards.length) {
          return false;
        }



        let current =
          0;


        let autoplay =
          null;


        let hovering =
          false;


        let touchStartX =
          0;


        let touchEndX =
          0;



        /* =====================================
           UPDATE POSITIONS
        ===================================== */

        function updateCarousel() {

          const total =
            cards.length;


          const prevIndex =
            (
              current - 1 + total
            ) %
            total;


          const nextIndex =
            (
              current + 1
            ) %
            total;


          cards.forEach(
            function (card, index) {

              card.classList.remove(

                "is-active",

                "is-prev",

                "is-next",

                "is-hidden"

              );


              if (
                index === current
              ) {

                card.classList.add(
                  "is-active"
                );


              } else if (
                index === prevIndex
              ) {

                card.classList.add(
                  "is-prev"
                );


              } else if (
                index === nextIndex
              ) {

                card.classList.add(
                  "is-next"
                );


              } else {

                card.classList.add(
                  "is-hidden"
                );

              }

            }
          );


          if (counter) {

            counter.textContent =
              String(
                current + 1
              ).padStart(
                2,
                "0"
              );

          }

        }



        /* =====================================
           NEXT
        ===================================== */

        function next() {

          current =
            (
              current + 1
            ) %
            cards.length;


          updateCarousel();

        }



        /* =====================================
           PREVIOUS
        ===================================== */

        function previous() {

          current =
            (
              current - 1 +
              cards.length
            ) %
            cards.length;


          updateCarousel();

        }



        /* =====================================
           AUTOPLAY
        ===================================== */

        function startAutoplay() {

          stopAutoplay();


          autoplay =
            setInterval(

              function () {

                if (!hovering) {

                  next();

                }

              },

              3800

            );

        }



        function stopAutoplay() {

          if (autoplay) {

            clearInterval(
              autoplay
            );


            autoplay =
              null;

          }

        }



        /* =====================================
           ARROW BUTTONS
        ===================================== */

        if (nextButton) {

          nextButton.addEventListener(
            "click",

            function () {

              next();

              startAutoplay();

            }
          );

        }


        if (prevButton) {

          prevButton.addEventListener(
            "click",

            function () {

              previous();

              startAutoplay();

            }
          );

        }



        /* =====================================
           CLICK SIDE CARDS
        ===================================== */

        cards.forEach(
          function (card) {

            card.addEventListener(
              "click",

              function () {

                if (
                  card.classList.contains(
                    "is-prev"
                  )
                ) {

                  previous();


                } else if (
                  card.classList.contains(
                    "is-next"
                  )
                ) {

                  next();

                }


                startAutoplay();

              }
            );

          }
        );



        /* =====================================
           PAUSE ON HOVER
        ===================================== */

        carousel.addEventListener(
          "mouseenter",

          function () {

            hovering =
              true;

          }
        );


        carousel.addEventListener(
          "mouseleave",

          function () {

            hovering =
              false;

          }
        );



        /* =====================================
           MOBILE SWIPE
        ===================================== */

        carousel.addEventListener(
          "touchstart",

          function (event) {

            touchStartX =
              event.changedTouches[0]
                .screenX;

          },

          {
            passive: true
          }
        );


        carousel.addEventListener(
          "touchend",

          function (event) {

            touchEndX =
              event.changedTouches[0]
                .screenX;


            const difference =
              touchStartX -
              touchEndX;


            if (
              Math.abs(
                difference
              ) < 40
            ) {

              return;

            }


            if (
              difference > 0
            ) {

              next();

            } else {

              previous();

            }


            startAutoplay();

          },

          {
            passive: true
          }
        );



        /* =====================================
           INITIAL STATE
        ===================================== */

        updateCarousel();

        startAutoplay();


        return true;

      }



      /* =====================================
         SYSTEME SAFE LOADING
      ===================================== */

      function start() {

        let attempts =
          0;


        const timer =
          setInterval(

            function () {

              attempts++;


              if (
                setupProofCarousel()
                ||
                attempts >= 50
              ) {

                clearInterval(
                  timer
                );

              }

            },

            200

          );

      }



      if (
        document.readyState ===
        "loading"
      ) {

        document.addEventListener(
          "DOMContentLoaded",
          start
        );

      } else {

        start();

      }

    })();

/* === Extracted from: <script> === */
(function () {

          let audio = null;
          let gate = null;
          let enterButton = null;
          let musicControl = null;
          let musicButton = null;
          let musicStatus = null;

          let enteredPortfolio = false;
          let userPaused = false;
          let initialized = false;



          /* =========================================
             FIND ALL ELEMENTS
          ========================================= */

          function getElements() {

            audio =
              document.getElementById(
                "yanz-portfolio-audio"
              );

            gate =
              document.getElementById(
                "yanz-glass-entry"
              );

            enterButton =
              document.getElementById(
                "yanz-glass-enter"
              );

            musicControl =
              document.getElementById(
                "yanz-music-control"
              );

            musicButton =
              document.getElementById(
                "yanz-music-button"
              );

            musicStatus =
              document.getElementById(
                "yanz-music-status"
              );


            /*
              DO NOT initialize until
              everything exists.
            */

            return !!(
              audio &&
              gate &&
              enterButton &&
              musicControl &&
              musicButton &&
              musicStatus
            );

          }



          /* =========================================
             UPDATE FLOATING PLAYER UI
          ========================================= */

          function updateMusicUI(
            isPlaying
          ) {

            if (
              !musicControl ||
              !musicStatus
            ) {
              return;
            }


            if (isPlaying) {

              musicControl.classList.add(
                "is-playing"
              );

              musicStatus.textContent =
                "NOW PLAYING";

            } else {

              musicControl.classList.remove(
                "is-playing"
              );


              if (userPaused) {

                musicStatus.textContent =
                  "PAUSED";

              } else if (
                !enteredPortfolio
              ) {

                musicStatus.textContent =
                  "SOUND ON ENTER";

              } else {

                musicStatus.textContent =
                  "PLAY SOUND";

              }

            }

          }



          /* =========================================
             STOP OTHER HTML AUDIO PLAYERS
          ========================================= */

          function stopOtherAudio() {

            document
              .querySelectorAll("audio")
              .forEach(
                function (item) {

                  if (
                    item !== audio &&
                    !item.paused
                  ) {

                    item.pause();

                  }

                }
              );

          }



          /* =========================================
             PLAY MAIN SOUNDTRACK
          ========================================= */

          function playMusic() {

            if (!audio) {
              return;
            }


            stopOtherAudio();


            audio.muted =
              false;

            audio.volume =
              .48;

            audio.loop =
              true;


            const promise =
              audio.play();


            if (
              promise &&
              typeof promise.then ===
              "function"
            ) {

              promise

                .then(
                  function () {

                    updateMusicUI(
                      true
                    );

                  }
                )

                .catch(
                  function () {

                    updateMusicUI(
                      false
                    );

                  }
                );

            }

          }



          /* =========================================
             GLASS ENTRY
          ========================================= */

          function setupEntryGate() {

            const isEditor =
              window.location.hostname.includes(
                "systeme.io"
              )
              &&
              (
                window.location.pathname.includes(
                  "/dashboard/"
                )
                ||
                window.location.pathname.includes(
                  "/edit"
                )
              );


            if (isEditor) {

              gate.style.display =
                "none";

              return;

            }



            /*
              Move overlay directly under body
              so Systeme containers don't break it.
            */

            if (
              gate.parentElement !==
              document.body
            ) {

              document.body.appendChild(
                gate
              );

            }


            gate.classList.remove(
              "is-leaving"
            );

            gate.style.display =
              "flex";


            requestAnimationFrame(
              function () {

                requestAnimationFrame(
                  function () {

                    gate.classList.add(
                      "is-ready"
                    );

                  }
                );

              }
            );



            enterButton.addEventListener(
              "click",

              function (event) {

                event.preventDefault();
                event.stopPropagation();


                if (enteredPortfolio) {
                  return;
                }


                enteredPortfolio =
                  true;

                userPaused =
                  false;


                /*
                  START THE ONE MASTER AUDIO
                */

                playMusic();



                /*
                  REMOVE GLASS
                */

                gate.classList.add(
                  "is-leaving"
                );


                setTimeout(
                  function () {

                    gate.classList.remove(
                      "is-ready"
                    );

                    gate.style.display =
                      "none";

                  },

                  750
                );

              }
            );

          }



          /* =========================================
             FLOATING MUSIC BUTTON
          ========================================= */

          function setupMusicButton() {

            musicButton.addEventListener(
              "click",

              function (event) {

                event.preventDefault();
                event.stopPropagation();


                /*
                  Don't let the floating player
                  start music before portfolio entry.
                */

                if (!enteredPortfolio) {

                  updateMusicUI(
                    false
                  );

                  return;

                }



                /*
                  PLAYING -> PAUSE
                */

                if (!audio.paused) {

                  userPaused =
                    true;

                  audio.pause();

                  updateMusicUI(
                    false
                  );

                  return;

                }



                /*
                  PAUSED -> RESUME
                */

                userPaused =
                  false;

                playMusic();

              }
            );

          }



          /* =========================================
             AUDIO EVENTS
          ========================================= */

          function setupAudioEvents() {

            audio.addEventListener(
              "playing",

              function () {

                updateMusicUI(
                  true
                );

              }
            );


            audio.addEventListener(
              "pause",

              function () {

                updateMusicUI(
                  false
                );

              }
            );


            audio.addEventListener(
              "ended",

              function () {

                updateMusicUI(
                  false
                );

              }
            );

          }



          /* =========================================
             INITIALIZE
          ========================================= */

          function initialize() {

            if (initialized) {
              return true;
            }


            if (!getElements()) {
              return false;
            }


            initialized =
              true;


            /*
              NEVER autoplay before
              ENTER THE PORTFOLIO.
            */

            audio.pause();

            audio.muted =
              false;

            audio.volume =
              .48;

            audio.loop =
              true;


            /*
              Fix "LOADING..." immediately.
            */

            userPaused =
              false;

            enteredPortfolio =
              false;

            updateMusicUI(
              false
            );


            setupAudioEvents();

            setupEntryGate();

            setupMusicButton();


            return true;

          }



          /* =========================================
             SYSTEME SAFE WAIT
          ========================================= */

          function boot() {

            let attempts =
              0;


            const waitForElements =
              setInterval(
                function () {

                  attempts++;


                  if (
                    initialize() ||
                    attempts >= 100
                  ) {

                    clearInterval(
                      waitForElements
                    );

                  }

                },

                150
              );

          }



          if (
            document.readyState ===
            "loading"
          ) {

            document.addEventListener(
              "DOMContentLoaded",
              boot,
              {
                once: true
              }
            );

          } else {

            boot();

          }

        })();

// Intercept "work with me" button at document level (capture phase).
// React fetches its button URL from systeme.io at runtime, so we cannot
// patch the href — instead we intercept every click before it reaches
// React's own handler, regardless of re-renders or dynamic state updates.
(function () {
  document.addEventListener('click', function (e) {
    var btn = e.target.closest('#button-12b0a01f');
    if (!btn) return;
    e.preventDefault();
    e.stopImmediatePropagation();
    var modal = document.getElementById('ts-contact-modal');
    if (modal) modal.classList.add('active');
  }, true); // capture phase — fires before any React handler
})();
