<div id="map-container">
  <div id="map"></div>
  <div id="content-austin" style="display:none">
    <p>Austin, TX</p>
  </div>

  <div id="content-austin-dot" class = "doticon" style="display:none"></div>

  <div id="content-hsinchu" style="display:none">
    <p>Hsinchu, Taiwan</p>
  </div>
  <div id="content-berkeley" style="display:none">
    <p>Berkeley, CA</p>
  </div>
  <div id="content-sanjose" style="display:none">
    <p>San Jose, CA</p>
  </div>
  <div id="content-sf" style="display:none">
    <p>San Francisco, CA</p>
  </div>
  <div id="content-chapelhill" style="display:none">
    <p>Chapel Hill, NC</p>
  </div>
  <div id="content-chicago" style="display:none">
    <p>Chicago, IL</p>
  </div>
  <div id="content-collegepark" style="display:none">
    <p>College Park, MD</p>
  </div>
  <div id="content-davis" style="display:none">
    <p>Davis, CA</p>
  </div>
  <div id="content-fairfax" style="display:none">
    <p>Fairfax, VA</p>
  </div>
  <div id="content-irvine" style="display:none">
    <p>Irvine, CA</p>
  </div>
  <div id="content-la" style="display:none">
    <p>Los Angeles, CA</p>
  </div>
  <div id="content-minn" style="display:none">
    <p>Minneapolis, MN</p>
  </div>
  <div id="content-nj" style="display:none">
    <p>New Brunswick, NJ</p>
  </div>
  <div id="content-pitt" style="display:none">
    <p>Pittsburgh, PA</p>
  </div>
  <div id="content-riverside" style="display:none">
    <p>Riverside, CA</p>
  </div>
  <div id="content-sd" style="display:none">
    <p>San Diego, CA</p>
  </div>
  <div id="content-sb" style="display:none">
    <p>Santa Barbara, CA</p>
  </div>
  <div id="content-sc" style="display:none">
    <p>Santa Cruz, CA</p>
  </div>
  <div id="content-seattle" style="display:none">
    <p>Seattle, WA</p>
  </div>
  <div id="content-pomona" style="display:none">
    <p>Pomona, CA</p>
  </div>
</div>
<style>
  /* Always set the map height explicitly to define the size of the div
   * element that contains the map. */
  #map {
    height: 100%;
    /*filter: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg"><filter id="g"><feColorMatrix type="matrix" values="0.3 0.3 0.3 0 0 0.3 0.3 0.3 0 0 0.3 0.3 0.3 0 0 0 0 0 1 0"/></filter></svg>#g');*/
    /*-webkit-filter: grayscale(100%);*/
    /*filter: grayscale(100%);    */
    /*filter: progid:DXImageTransform.Microsoft.BasicImage(grayScale=1);*/
  }
  /* Optional: Makes the sample page fill the window. */
  #map-container {
    height: 500px;
    margin: 0;
    padding: 0;
  }

/*  .pin-img {
    width: 30px;
  }*/

  /* The popup bubble styling. */
  .popup-bubble {
    /* Position the bubble centred-above its parent. */

    position: absolute;
    top: 0;
    left: 0;
    transform: translate(-50%, -100%);
    /* Style the bubble. */
    padding: 5px;
    border-radius: 5px;
    font-family: sans-serif;

    /*overflow-y: auto;*/
    /*max-height: 60px;*/
    box-shadow: 0px 2px 10px 1px rgba(0,0,0,0.5);
    background-color: white;
    color: black;
    /* @a2cn styling */

  }


  /* The parent of the bubble. A zero-height div at the top of the tip. */
  .popup-bubble-anchor {
    /* Position the div a fixed distance above the tip. */
    position: absolute;

    width: 100%;
    bottom: /* TIP_HEIGHT= */ 8px;
    left: 0;
    opacity: 0;

  }
  .popup-bubble-anchor:hover {
    /*SPECIAL HERE EMMETT */
    opacity: 1;
  }


  /* This element draws the tip. */
  .popup-bubble-anchor::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    /* Center the tip horizontally. */
    transform: translate(-50%, 0%);
    /* The tip is a https://css-tricks.com/snippets/css/css-triangle/ */
    width: 0;
    height: 0;
    /* The tip is 8px high, and 12px wide. */
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-top: /* TIP_HEIGHT= */ 8px solid white;    /* @a2cn styling */
    /* @a2cn styling */

    /* EMMETT dot hodor*/
  }
  /* JavaScript will position this div at the bottom of the popup tip. */
  .popup-container {
    cursor: auto;
    height: 0;
    position: absolute;
    background-color: purple;
    /* The max width of the info window. */
    width: 200px;
  }

  .doticon {
    height: 25px;
    width: 25px;
    background-color: #0047ab;
    border-radius: 50%;
    display: block;
    opacity: 1;
  }

  /* remove google logo and copyright */
  a[href^="http://maps.google.com/maps"]{display:none !important}
  a[href^="https://maps.google.com/maps"]{display:none !important}

  .gmnoprint a, .gmnoprint span, .gm-style-cc {
      display:none;
  }
  .gmnoprint div {
      background:none !important;
  }
</style>

<script>
  var map, popup, Popup;
  var dot, Dot;
  var ministry_dict = {
    "UT Austin": {
      "Koinonia Christian Fellowship": "https://www.koinoniatexas.org/"
    },
    "UC Berkeley": {
      "Klesis":  "https://berkeley.klesis.org/",
      "acts2fellowship": "https://www.a2fberkeley.org/",
      "Koinonia Berkeley": "http://koinberkeley.org/"
    },
    "San Jose State University": {
      "Klesis": "https://www.sjsu.klesis.org/"
    },
    "National Chiao Tung University": {
      "Koinonia": "http://www.koinonia-hsinchu.org/"
    },
    "SF State": {
      "Koinonia": "http://www.sfsukoinonia.org/"
    },
    "UNC": {
      "acts2fellowship": "http://unc.acts2fellowship.org/"
    },
    "NC State": {
      "acts2fellowship": "https://ncsu.acts2fellowship.org/"
    },
    "Northwestern": {
      "makenew": "https://nu.makenewfellowship.org/"
    },
    "University of Chicago": {
      "makenew": "https://uchicago.makenewfellowship.org/"
    },
    "University of Maryland": {
      "Kairos": "https://www.kairosfellowship.org/"
    },
    "George Mason University": {
      "makenew": "https://gmu.makenewfellowship.org/"
    },
    "UC Davis": {
      "Koinonia": "http://www.koinoniadavis.org/",
      "Klesis": "https://klesisdavis.org/"
    },
    "UC Irvine": {
      "acts2fellowship": "https://www.a2firvine.org/"
    },
    "UCLA": {
      "acts2fellowship": "https://ucla.acts2fellowship.org/",
      "Klesis": "https://www.ucla.klesis.org/"
    },
    "University of Minnesota": {
      "acts2fellowship": "http://a2fumn.org/"
    },
    "Rutgers": {
      "Klesis": "https://rutgers.campuslabs.com/engage/organization/klesis-gracepoint"
    },
    "Carnegie Mellon": {
      "Klesis": "https://cmu.klesis.org/"
    },
    "University of Pittsburgh": {
      "makenew": "https://pitt.makenewfellowship.org/"
    },
    "UC Riverside": {
      "acts2fellowship": "https://www.a2friverside.org/"
    },
    "UCSD": {
      "acts2fellowship": "https://www.ucsda2f.org/",
      "Klesis": "https://www.sdklesis.org/"
    },
    "UCSB": {
      "acts2fellowship": "http://ucsb.acts2fellowship.org/"
    },
    "UC Santa Cruz": {
      "Klesis": "https://ucsc.klesis.org/"
    },
    "University of Washington": {
      "acts2fellowship": "http://uw.acts2fellowship.org/"
    },
    "Cal Poly Pomona": {
      "acts2fellowship": "https://www.a2fpomona.org/"
    }
  }

  /** Initializes the map and the custom popup. */
  function initMap() {
    /* Emmett Hodor map changes=*/
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 37.0902, lng: -95.7129},
      zoom: 4,
      mapId: 'e4c263120a7d9300',
      disableDefaultUI: true
    });

    /* custom marker for a2cn color scheme - david olivar */
    var image = {
      url: "data:image/svg+xml,%3Csvg id='Layer_1' data-name='Layer 1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 857.71 1497.37'%3E%3Cdefs%3E%3Cstyle%3E.cls-1%7Bfill:%23c99239%7D%3C/style%3E%3C/defs%3E%3Cpath class='cls-1' d='M858.16 442.58c-2.43 71.34-19.8 138.94-50.51 203.28-17.95 37.6-38.45 73.79-59.5 109.68-37.7 64.28-75.55 128.46-111 194-15.75 29.15-27.93 59.81-40.79 90.2a2429.9 2429.9 0 00-125.79 384.59c-3.72 15.65-7.09 31.39-11.88 46.77-2.25 7.21-5.28 13.92-10.57 19.63s-20.38 8.45-27.6 5.21c-9.07-4.07-14.4-10.63-17.5-19.5-5.09-14.54-8.43-29.56-11.91-44.53a2452.65 2452.65 0 00-133-407.37c-7.39-17.32-14.31-34.86-22.21-51.95-8.21-17.74-18.07-34.67-27.41-51.84C174.74 858.66 138.23 798.1 102.67 737 80 698 58.15 658.63 40.49 617.05c-19.24-45.29-31.89-92.29-37-141.28C2.06 462.61.9 449.43.61 436.18-.17 432.11 1 428 0 423.89v-28.63A160.31 160.31 0 00.91 378c.32-14.89 3.16-29.4 6.28-43.86a426.44 426.44 0 0181.88-172.23 391.29 391.29 0 0138.37-41.39A463.46 463.46 0 01218.7 53.2c34.59-19.39 71-34.36 109.53-43.89 14.47-3.58 29-6.7 43.9-8.13 9.65-.93 19.37-1.34 29.09-1.37 1.28 0 2.61.39 3.83-.34h37.22a176.78 176.78 0 0019 1c15.32.3 30.27 3 45.18 6.08a435.06 435.06 0 0174.5 22.6 479.12 479.12 0 01107.3 60.1 465.27 465.27 0 0162.13 55.35 397.35 397.35 0 0156 76.63 436.26 436.26 0 0134.52 78.43 404.48 404.48 0 0115.85 67.45c1 7.1 1 14.32 1.39 21.49.27 4.85 0 9.71.67 14.54v28.63c-1 3.56.19 7.23-.65 10.81z'/%3E%3Cpath d='M0 423.89c1.24 4.05.71 8.18.61 12.29a1.62 1.62 0 01-.61-.12z' fill='%23919191'/%3E%3Cpath d='M806.65 393.74a325.59 325.59 0 00-10.72-60.45 378.19 378.19 0 00-40.67-95.07 349.46 349.46 0 00-53.52-68.16 394.32 394.32 0 00-34.52-30.5 434.06 434.06 0 00-64.84-42.44 408.4 408.4 0 00-83.19-33.27 375.75 375.75 0 00-92.77-13.53 320.23 320.23 0 00-50.91 3.45 361.72 361.72 0 00-102.73 30.89 403.37 403.37 0 00-95.66 62.11 396.73 396.73 0 00-43.26 43.61 346.91 346.91 0 00-44.68 68.85 378.59 378.59 0 00-27.52 73.57 338.43 338.43 0 00-10.8 78.41c-.31 15.49.75 30.94 2 46.38a476.23 476.23 0 006.27 47.46c7.76 42.18 22.49 82 41 120.52 10.65 22.15 22.47 43.68 34.59 65 21 37 43 73.44 64.32 110.3 10.61 18.37 21.23 36.74 31.68 55.21q13.92 24.58 27.46 49.37c8 14.67 16.47 29.12 23.22 44.35q26.86 60.66 51.1 122.46 32.5 82.41 58.9 167 20.35 65.23 37.09 131.5c.34 1.34.34 2.83 1.66 4.23a14.6 14.6 0 00.57-1.37c5.9-22 11.58-44 17.74-66 12.32-43.86 25.79-87.37 40.79-130.4 6.27-18 12.57-36 19.23-53.9q20.19-54.15 42.63-107.39c14.35-34.18 28.51-68.4 46.81-100.79 13.9-24.59 27.18-49.54 41.27-74 21.31-37 43-73.74 64.55-110.58 20.83-35.61 41.51-71.3 58.92-108.76 7.29-15.68 14-31.63 19.73-47.94a436.37 436.37 0 0020.84-86.43c2.69-19.61 3.82-39.33 4.65-59.07.5-11.55-.31-23.08-1.23-34.62zM429 582c-85.16-.2-154.37-69.82-154.17-155.09.19-85.1 69.51-154.11 154.74-154s154.5 69.45 154.36 154.79S514.2 582.2 429 582z' fill='%23f6ae2d'/%3E%3Cpath class='cls-1' d='M429.2 269.33c85.32.07 154.5 69.45 154.35 154.79s-69.73 154.54-154.92 154.34-154.37-69.83-154.17-155.09c.19-85.1 69.54-154.11 154.74-154.04z'/%3E%3C/svg%3E",
      scaledSize: new google.maps.Size(30, 30)
    };


    Popup = createPopupClass();
    Dot = createDotClass();

    popupAustin = new Popup(
        new google.maps.LatLng(30.2672, -97.7431),
        document.getElementById('content-austin'),
        'UT Austin');
    popupAustin.setMap(map);
    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(30.2672, -97.7431),
        size: 2,
        title:"Hello World!",
        animation: google.maps.Animation.DROP,
        icon: image
    });
    // To add the marker to the map, call setMap();
    marker.setMap(map);



    popupSJSU = new Popup(
        new google.maps.LatLng(37.335328, -121.881195),
        document.getElementById('content-sanjose'),
        'San Jose State University');
    popupSJSU.setMap(map);
    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(37.335328, -121.881195),
        size: 2,
        title:"Hello World!",
        animation: google.maps.Animation.DROP,
        icon: image
    });
    // To add the marker to the map, call setMap();
    marker.setMap(map);



    popupBerkeley = new Popup(
        new google.maps.LatLng(37.8719, -122.2585),
        document.getElementById('content-berkeley'),
        'UC Berkeley');
    popupBerkeley.setMap(map);
    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(37.8719, -122.2585),
        size: 2,
        title:"Hello World!",
        animation: google.maps.Animation.DROP,
        icon: image
    });
    marker.setMap(map);


    popupHsinchu = new Popup(
        new google.maps.LatLng(24.8138, 120.9675),
        document.getElementById('content-hsinchu'),
        'National Chiao Tung University');
    popupHsinchu.setMap(map);
    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(24.8138, 120.9675),
        size: 2,
        title:"Hello World!",
        animation: google.maps.Animation.DROP,
        icon: image
    });
    marker.setMap(map);



    popupSf = new Popup(
        new google.maps.LatLng(37.7241, -122.4799),
        document.getElementById('content-sf'),
        'SF State');
    popupSf.setMap(map);
    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(37.7241, -122.4799),
        size: 2,
        title:"Hello World!",
        animation: google.maps.Animation.DROP,
        icon: image
    });
    marker.setMap(map);

    popupChapelHill = new Popup(
        new google.maps.LatLng(35.9132, -79.0558),
        document.getElementById('content-chapelhill'),
        'UNC');
    popupChapelHill.setMap(map);
    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(35.9132, -79.0558),
        size: 2,
        title:"Hello World!",
        animation: google.maps.Animation.DROP,
        icon: image
    });
    marker.setMap(map);

    popupChicago = new Popup(
        new google.maps.LatLng(41.8781, -87.6298),
        document.getElementById('content-chicago'),
        'University of Chicago');
    popupChicago.setMap(map);
    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(41.8781, -87.6298),
        size: 2,
        title:"Hello World!",
        animation: google.maps.Animation.DROP,
        icon: image
    });
    marker.setMap(map);

    popupCollegePark = new Popup(
        new google.maps.LatLng(38.9897, -76.9378),
        document.getElementById('content-collegepark'),
        'University of Maryland');
    popupCollegePark.setMap(map);
    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(38.9897, -76.9378),
        size: 2,
        title:"Hello World!",
        animation: google.maps.Animation.DROP,
        icon: image
    });
    marker.setMap(map);

    popupDavis = new Popup(
        new google.maps.LatLng(38.5449, -121.7405),
        document.getElementById('content-davis'),
        'UC Davis');
    popupDavis.setMap(map);
    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(38.5449, -121.7405),
        size: 2,
        title:"Hello World!",
        animation: google.maps.Animation.DROP,
        icon: image
    });
    marker.setMap(map);

    popupFairfax = new Popup(
        new google.maps.LatLng(38.8298, -77.3074),
        document.getElementById('content-fairfax'),
        'George Mason University');
    popupFairfax.setMap(map);
    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(38.8298, -77.3074),
        size: 2,
        title:"Hello World!",
        animation: google.maps.Animation.DROP,
        icon: image
    });
    marker.setMap(map);


    popupIrvine = new Popup(
        new google.maps.LatLng(33.6846, -117.8265),
        document.getElementById('content-irvine'),
        'UC Irvine');
    popupIrvine.setMap(map);
    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(33.6846, -117.8265),
        size: 2,
        title:"Hello World!",
        animation: google.maps.Animation.DROP,
        icon: image
    });
    marker.setMap(map);

    popupLa = new Popup(
        new google.maps.LatLng(34.0689, -118.4452),
        document.getElementById('content-la'),
        'UCLA');
    popupLa.setMap(map);
    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(34.0689, -118.4452),
        size: 2,
        title:"Hello World!",
        animation: google.maps.Animation.DROP,
        icon: image
    });
    marker.setMap(map);


    popupMinn = new Popup(
        new google.maps.LatLng( 44.977753, -93.265015),
        document.getElementById('content-minn'),
        'University of Minnesota');
    popupMinn.setMap(map);
    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(44.977753, -93.265015),
        size: 2,
        title:"Hello World!",
        animation: google.maps.Animation.DROP,
        icon: image
    });
    marker.setMap(map);



    popupNj = new Popup(
        new google.maps.LatLng(40.495949, -74.444122),
        document.getElementById('content-nj'),
        'Rutgers');
    popupNj.setMap(map);
    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(40.495949, -74.444122),
        size: 2,
        title:"Hello World!",
        animation: google.maps.Animation.DROP,
        icon: image
    });
    marker.setMap(map);


    popupPitt = new Popup(
        new google.maps.LatLng(40.440624, -79.995888),
        document.getElementById('content-pitt'),
        'Pittsburgh');
    popupPitt.setMap(map);
    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(40.440624, -79.995888),
        size: 2,
        title:"Hello World!",
        animation: google.maps.Animation.DROP,
        icon: image
    });
    marker.setMap(map);



    popupRiverside = new Popup(
        new google.maps.LatLng(33.980602, -117.375496),
        document.getElementById('content-riverside'),
        'UC Riverside');
    popupRiverside.setMap(map);
    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(33.980602, -117.375496),
        size: 2,
        title:"Hello World!",
        animation: google.maps.Animation.DROP,
        icon: image
    });
    marker.setMap(map);



    popupSd = new Popup(
        new google.maps.LatLng(32.715736, -117.161087),
        document.getElementById('content-sd'),
        'UCSD');
    popupSd.setMap(map);
    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(32.715736, -117.161087),
        size: 2,
        title:"Hello World!",
        animation: google.maps.Animation.DROP,
        icon: image
    });
    marker.setMap(map);


    popupSb = new Popup(
        new google.maps.LatLng(34.43, -119.83),
        document.getElementById('content-sb'),
        'UCSB');
    popupSb.setMap(map);
    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(34.43, -119.83),
        size: 2,
        title:"Hello World!",
        animation: google.maps.Animation.DROP,
        icon: image
    });
    marker.setMap(map);

    popupSc = new Popup(
        new google.maps.LatLng(36.97414, -122.028795),
        document.getElementById('content-sc'),
        'UC Santa Cruz');
    popupSc.setMap(map);
    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(36.97414, -122.028795),
        size: 100,
        title:"Hello World!",
        animation: google.maps.Animation.DROP,
        icon: image
    });
    marker.setMap(map);

    popupSeattle = new Popup(
        new google.maps.LatLng(47.603229, -122.33028),
        document.getElementById('content-seattle'),
        'University of Washington');
    popupSeattle.setMap(map);
    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(47.603229, -122.33028),
        size: 100,
        title:"Hello World!",
        animation: google.maps.Animation.DROP,
        icon: image
    });
    marker.setMap(map);

    popupPomona = new Popup(
        new google.maps.LatLng(34.055118, -117.750048),
        document.getElementById('content-pomona'),
        'Cal Poly Pomona');
    popupPomona.setMap(map);
    var marker = new google.maps.Marker({
        map: map,
        position: new google.maps.LatLng(34.055118, -117.750048),
        size: 100,
        title:"Hello World!",
        animation: google.maps.Animation.DROP,
        icon: image
    });
    marker.setMap(map);
  }

  function togglePopup(element, church) {
    function toggle() {
      if (element.children.length === 1) {
        if (church === 'Pittsburgh') {
          var p = document.createElement('p');
          var churchName = document.createTextNode('Carnegie Mellon');
          p.appendChild(churchName);
          element.appendChild(p);
          listElement = document.createElement('ul');
          for (var key in ministry_dict['Carnegie Mellon']) {
            listItem = document.createElement('li');
            var a = document.createElement('a');
            var linkText = document.createTextNode(key);
            a.appendChild(linkText);
            a.title = key;
            a.href = ministry_dict['Carnegie Mellon'][key];
            a.setAttribute('target', '_blank');
            listItem.appendChild(a);
            listElement.appendChild(listItem);
          }
          element.appendChild(listElement);

          var p2 = document.createElement('p');
          var churchName2 = document.createTextNode('University of Pittsburgh');
          p2.appendChild(churchName2);
          element.appendChild(p2);
          listElement2 = document.createElement('ul');
          for (var key2 in ministry_dict['University of Pittsburgh']) {
            listItem2 = document.createElement('li');
            var a2 = document.createElement('a');
            var linkText2 = document.createTextNode(key2);
            a2.appendChild(linkText2);
            a2.title = key2;
            a2.href = ministry_dict['University of Pittsburgh'][key2];
            a2.setAttribute('target', '_blank');
            listItem2.appendChild(a2);
            listElement2.appendChild(listItem2);
          }
          element.appendChild(listElement2);
        } else {
          var p = document.createElement('p');
          var churchName = document.createTextNode(church);
          p.appendChild(churchName);
          element.appendChild(p);
          listElement = document.createElement('ul');
          for (var key in ministry_dict[church]) {
            listItem = document.createElement('li');
            var a = document.createElement('a');
            var linkText = document.createTextNode(key);
            a.appendChild(linkText);
            a.title = key;
            a.href = ministry_dict[church][key];
            a.setAttribute('target', '_blank');
            listItem.appendChild(a);
            listElement.appendChild(listItem);
          }
          element.appendChild(listElement);
        };
        element.style.zIndex = 99;
      } else {
        while (element.children.length > 1) {
          element.removeChild(element.lastChild);
        }
        element.style.zIndex = 1;
      };
    };
    return toggle;
  }




  function createDotClass() {
    /**
     * A customized popup on the map.
     * @param {!google.maps.LatLng} position
     * @param {!Element} content The bubble div.
     * @constructor
     * @extends {google.maps.OverlayView}
     */
    function Dot(position, content) {
      this.position = position;


      var dotAnchor = document.createElement('div');
      content.classlist.add('doticon');

      //DIRECT LINK FOR POPUPS? getElementById(thingy).run
      //dotAnchor.onmouseover= togglePopup(content, church);


      // This zero-height div is positioned at the bottom of the tip.
      this.containerDiv = document.createElement('div');
      this.containerDiv.classList.add('doticon');
      this.containerDiv.appendChild(dotAnchor);
      // this.containerDiv.appendChild(pinImg);




      // Optionally stop clicks, etc., from bubbling up to the map.
      google.maps.OverlayView.preventMapHitsAndGesturesFrom(this.containerDiv);
    }
    // ES5 magic to extend google.maps.OverlayView.
    Dot.prototype = Object.create(google.maps.OverlayView.prototype);

    /** Called when the Dot is added to the map. */
    Dot.prototype.onAdd = function() {
      this.getPanes().floatPane.appendChild(this.containerDiv);
    };

    /** Called when the Dot is removed from the map. */
    Dot.prototype.onRemove = function() {
      if (this.containerDiv.parentElement) {
        this.containerDiv.parentElement.removeChild(this.containerDiv);
      }
    };

    /** Called each frame when the Dot needs to draw itself. */
    Dot.prototype.draw = function() {
      var divPosition = this.getProjection().fromLatLngToDivPixel(this.position);

      // Hide the Dot when it is far out of view.
      var display =
          Math.abs(divPosition.x) < 4000 && Math.abs(divPosition.y) < 4000 ?
          'block' :
          'none';

      if (display === 'block') {
        this.containerDiv.style.left = divPosition.x + 'px';
        this.containerDiv.style.top = divPosition.y + 'px';
      }
      if (this.containerDiv.style.display !== display) {
        this.containerDiv.style.display = display;
      }
    };

    return Dot;
  }



  /**
   * Returns the Popup class.
   *
   * Unfortunately, the Popup class can only be defined after
   * google.maps.OverlayView is defined, when the Maps API is loaded.
   * This function should be called by initMap.
   */
  function createPopupClass() {
    /**
     * A customized popup on the map.
     * @param {!google.maps.LatLng} position
     * @param {!Element} content The bubble div.
     * @constructor
     * @extends {google.maps.OverlayView}
     */
    function Popup(position, content, church) {
      this.position = position;

      content.classList.add('popup-bubble');
      content.style.display = 'block';
      content.style.cursor = 'pointer';

      // This zero-height div is positioned at the bottom of the bubble.
      var bubbleAnchor = document.createElement('div');
      bubbleAnchor.classList.add('popup-bubble-anchor'); //HODOR
      //bubbleAnchor.classlist.add('dot');
      //bubbleAnchor.classList.add('doticon');
      bubbleAnchor.appendChild(content); //HODOR
      //bubbleAnchor.onmouseover="togglePopup(content, church)" //hodor
      bubbleAnchor.onclick = togglePopup(content, church);


      // This zero-height div is positioned at the bottom of the tip.
      this.containerDiv = document.createElement('div');
      this.containerDiv.classList.add('popup-container');
      this.containerDiv.appendChild(bubbleAnchor);
      // this.containerDiv.appendChild(pinImg);

      // Optionally stop clicks, etc., from bubbling up to the map.
      google.maps.OverlayView.preventMapHitsAndGesturesFrom(this.containerDiv);
    }
    // ES5 magic to extend google.maps.OverlayView.
    Popup.prototype = Object.create(google.maps.OverlayView.prototype);

    /** Called when the popup is added to the map. */
    Popup.prototype.onAdd = function() {
      this.getPanes().floatPane.appendChild(this.containerDiv);
    };

    /** Called when the popup is removed from the map. */
    Popup.prototype.onRemove = function() {
      if (this.containerDiv.parentElement) {
        this.containerDiv.parentElement.removeChild(this.containerDiv);
      }
    };

    /** Called each frame when the popup needs to draw itself. */
    Popup.prototype.draw = function() {
      var divPosition = this.getProjection().fromLatLngToDivPixel(this.position);

      // Hide the popup when it is far out of view.
      var display =
          Math.abs(divPosition.x) < 4000 && Math.abs(divPosition.y) < 4000 ?
          'block' :
          'none';

      if (display === 'block') {
        this.containerDiv.style.left = divPosition.x + 'px';
        this.containerDiv.style.top = divPosition.y + 'px';
      }
      if (this.containerDiv.style.display !== display) {
        this.containerDiv.style.display = display;
      }
    };

    return Popup;
}
</script>
<script async defer
  src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDHv_e0N5YSqJOkYXG5VF16M3Bkdv5BdeQ&callback=initMap&map_ids=e4c263120a7d9300">
</script>