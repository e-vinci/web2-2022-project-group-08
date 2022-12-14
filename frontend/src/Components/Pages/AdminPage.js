import { clearPage } from "../../utils/render";


const AdminPage = () => {
    clearPage();
    renderAdminPage();
};

function createOptionCoursesAsString (courses){
    let coursesOptions = '';
    courses?.forEach((course)=>{
    coursesOptions += `
        <option>${course.name}</option>
    
    `;
});
return coursesOptions;
}

async function renderAdminPage () {
    const main = document.querySelector('main');


    const response = await fetch(`${process.env.API_BASE_URL}/courses`);
    if (!response.ok) throw new Error(`fetch error : ${response.status} : ${response.statusText}`);
    const courses = await response.json();
    const OptionAsString = createOptionCoursesAsString(courses);

    
    
    

    const configQuizHTML = `
    <div class="container my-3">

        <h1 class="text-center">Bienvenue Nom Prénom</h1>

        <div class="row">

            <div class="col">
                <div class="container border border-white border-2  py-3 rounded-5 ">

                    <div class="row mx-1">
                        <h3>Ajout professeur :</h3>
                    </div>

                    <form action="" method="post">
                        <div class="row justify-content-around">
                            <div class="col-4 my-auto">
                                <div class="form-group">
                                    <label for="exampleInputEmail1" class="form-label mt-4">Email address</label>
                                    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
                                    <small id="emailHelp" class="form-text text-muted ">Un email automatique sera envoyé au professeur pour ses identifiants</small>
                                </div>
                            </div>

                        

                            <div class="col-5">
                                <div class="form-group">
                                    <label for="exampleSelect1" class="form-label mt-4">Attribuez les cours* :</label>
                                    <select multiple="" class="form-select" id="exampleSelect1">
                                    ${OptionAsString}
                                    </select>
                                    <small id="" class="form-text text-muted ">*cours : Vous devez sélectionner tous les cours.</small>
                                </div>

                            </div>

                            <div class="col-2 my-auto">
                                <button class="btn btn-primary"> Ajouter</button>
                            </div>
                            
                            
                        </div>
                    </form>
                        
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col">
                <div class="container border border-white border-2  py-3 rounded-5 my-3">
                    <div class="row mx-1">
                        <h3>Modification des cours du professeur :</h3>

                        <div class="alert alert-dismissible alert-success w-50">
                            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                            <strong>Votre demande a été enregistré!</strong>
                        </div>
                    </div>

                    <form action="POST" action="">


                        <div class="row justify-content-around">

                            <form action="GET" action="">
                                <div class="col-4">
                                    <div class="form-group">
                                        <label for="exampleSelect1" class="form-label mt-4">Example select</label>
                                        <select class="form-select" id="exampleSelect1">
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                        </select>
                                    </div>
                                    
                                    <p>Ce professeur est inscrit au cours de : </p>

                                    <p>Javascript, BD2.</p>
                                    
                                </div>
    
                                <div class="col-2 my-auto">
                                    <button class="btn btn-info"> Obtenir Infos</button>
                                </div>
                            </form>
                            
    
                            <div class="col-4">
                                <div class="form-group">
                                    <label for="exampleSelect2" class="form-label mt-4">Attribuez les cours* :</label>
                                    <select multiple="" class="form-select" id="exampleSelect2">
                                        ${OptionAsString}
                                    </select>
                                    <small id="" class="form-text text-muted ">*cours : Vous devez sélectionner tous les cours.</small>
                                </div>

    
                            </div>
    
                            <div class="col-2 my-auto">
                                <button class="btn btn-primary"> Modifier</button>
                            </div>
                        </div>
                    </form>
                    


                </div>
            </div>
        </div>
        

    </div>
    
    
    `; 
    main.innerHTML +=  configQuizHTML;
}

export default AdminPage;

