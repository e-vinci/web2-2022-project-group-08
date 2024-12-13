import logo from '../../img/Logo_bootstrap.png';

const Footer = () => {
    renderFooter();
};


function renderFooter() {
    const main = document.querySelector('footer');

    const footer = `
    <footer class="container-fluid bg-dark py-2 text-white">
        <div class="row justify-content-around">
    
            <div class="col-4">
                <img class="logoFooter" src="${logo}" alt="" style="width:100%; height:auto"></a>
            </div>
    
            <div class="col-4">
                <h3 class="text-white">Membres projet</h3>

                <div class="container-fluid">
                    <div class="row">
                        <div class="col">
                            <p>Agbassah Steven</p>
                        </div>

                        <div class="col">
                            <p>Bationo Kevin</p>
                        </div>
                    </div>

                    /*
                    <div class="row">
                        <div class="col">
                            <p>Chitsaz Ramtin</p>
                        </div>
                    */

                        <div class="col">
                            <p>Hebbal Manal</p>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col">
                            <p>Kueze Nounga Dorcas</p>
                        </div>
                    </div>
                </div>
            </div>
    
            <div class="col-4">
                <h3 class="text-white">Contact</h3>
                <div class="container-fluid">

                    <div class="row">
                        <div class="col">
                            <p>
                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-house" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M2 13.5V7h1v6.5a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5V7h1v6.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5zm11-11V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z"/>
                                <path fill-rule="evenodd" d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z"/>
                                </svg>
                                Bruxelles, Belgium</p>

                                <p>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-envelope" viewBox="0 0 16 16">
                                    <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z"/>
                                    </svg>
                                    <a
                                    class="mail text-white"
                                    href="mailto:quizzteam8@gmail.com"
                                    >IPLEARN</a>
                                </p>
                        </div>
                    </div>
                </div>
                    
    
            </div>

        
    
            <div class="row">
                <div class="col text-center">
                    <p>Tous droits réservés. © 2022 IPLEARN</p>
                </div>
            </div>
    
        </div>
    </footer>
    `;

    main.innerHTML +=  footer;
}

export default Footer;
