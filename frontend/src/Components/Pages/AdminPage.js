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

function createOptionTeachers(teachers){
    let teachersOptions = '';
    teachers?.forEach((teacher)=>{
        teachersOptions += `
        <option>${teacher.mail}</option>
    
    `;
});
return teachersOptions;
}

async function renderAdminPage () {
    const main = document.querySelector('main');
    // document.querySelector('#addCourseForm').addEventListener('submit', onRegister);


    const response = await fetch(`${process.env.API_BASE_URL}/courses`);
    if (!response.ok) throw new Error(`fetch error : ${response.status} : ${response.statusText}`);
    const courses = await response.json();
    const OptionAsString = createOptionCoursesAsString(courses);

    const response2 = await fetch(`${process.env.API_BASE_URL}/admins`);
    if (!response2.ok) throw new Error(`fetch error : ${response2.status} : ${response2.statusText}`);
    const teachers = await response2.json();
    const OptionAsStringForTeachers = createOptionTeachers(teachers);
    

    const adminPage = `

    <div class="container my-3">

        <h1 class="text-center">Bienvenue Nom Prénom</h1>

        <div class="row justify-content-around"> 
            <div class="col-5 border border-white border-2  py-1 my-3 rounded-5">

                <form class="container-fluid" id="addCourseForm">
                    <h3>Création d'un cours :</h3>

                    <div class="row">
                        <div class="col-6  mx-auto">
                            <div class="form-group">
                                <label class="col-form-label mt-4" for="courseCode">Entrez le code du cours</label>
                                <input required type="text" class="form-control" placeholder="Exemple : BINV0000" id="courseCode" name="courseCode">
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-8  mx-auto">
                            <div class="form-group">
                                <label class="col-form-label mt-4" for="courseName">Entrez le nom du cours</label>
                                <input required type="text" class="form-control text-center" placeholder="Exemple : Javascript" id="coursName" name="coursName">
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col">
                            <div class="form-group">
                                <label for="courseTextarea" class="form-label mt-4">Entrez description du cours</label>
                                <textarea required class="form-control" id="courseTextarea" name="courseTextarea" rows="3"></textarea>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col">
                            <div class="form-group">
                                <label for="courseFile" class="form-label mt-4">Choisissez une photo (pnj, jpeg, ..) </label>
                                <input  class="form-control" type="file" id="courseFile name="courseFile">
                            </div>
                        </div>
                    </div>

                    <div class="row my-2">
                        <div class="col-auto mx-auto">
                            <button type="submit" class="btn btn-primary rounded-pill">Créer cours</button>
                        </div>
                    </div>

                </form>


            </div>

            <div class="col-5 border border-white border-2  py-1 my-3 rounded-5">
                <form  id="modifyCourse" class="container-fluid">
                    <h3>Modifier un cours :</h3>

                    <div class="row">
                        <div class="col-8 mx-auto">
                            <div class="form-group">
                                <label for="selectCourseName" class="form-label mt-4">Sélectionnez un cours à modifier</label>
                                <select class="form-select" id="selectCourseName" name="selectCourseName">
                                    ${OptionAsString}
                                </select>
                            </div>
                            <small id="emailHelp" class="form-text text-muted ">Si vous ne remplissez pas les champs, ils resteront ceux par défaut.</small>

                        </div>
                    </div>

                    <div class="row">
                        <div class="col-6 mx-auto">
                            <div class="form-group">
                                <label class="col-form-label mt-4" for="courseCode">Entrez le code du cours</label>
                                <input required type="text" class="form-control" placeholder="Exemple : BINV0000" id="courseCode" name="courseCode">
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-8  mx-auto">
                            <div class="form-group">
                                <label class="col-form-label mt-4" for="courseName">Entrez le nom du cours</label>
                                <input required type="text" class="form-control text-center" placeholder="Exemple : Javascript" id="courseName" name="courseName">
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col">
                            <div class="form-group">
                                <label for="courseTextarea" class="form-label mt-4">Entrez description du cours</label>
                                <textarea required class="form-control" id="courseTextarea" name="courseTextarea" rows="3"></textarea>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col">
                            <div class="form-group">
                                <label for="courseFile" class="form-label mt-4">Choisissez une photo (pnj, jpeg, ..) </label>
                                <input class="form-control" type="file" id="courseFile" name="courseFile">
                            </div>
                        </div>
                    </div>

                    <div class="row my-2">
                        <div class="col-auto mx-auto">
                            <button type="submit" class="btn btn-primary rounded-pill">Modifier le cours</button>
                        </div>
                    </div>

                </form>
            </div>
        </div>

        
        <div class="row w-50 mx-auto">
            <div class="col">
                <div class="container border border-white border-2  py-1 my-3 rounded-5 ">

                    <div class="row mx-1">
                        <h3>Supprimer un cours :</h3>
                    </div>

                    <form id="deleteCourse">
                        <div class="row justify-content-center ">
                            
                            <div class="col-4">
                                <div class="form-group">
                                    <label for="selectCourseName" class="form-label mt-4">Sélectionnez un cours à modifier</label>
                                    <select class="form-select" id="selectCourseName" name="selectCourseName">
                                        ${OptionAsString}
                                    </select>
                                </div>
                            </div>

                            <div class="col-3 align-self-end">
                                <button type="submit" class="btn btn-danger rounded-pill"> Supprimer</button>
                            </div>
                        </div>
                    </form>
                        
                </div>
            </div>
        </div>


        <div class="row">

            <div class="col">
                <div class="container border border-white border-2  py-1 my-3 rounded-5 ">

                    <div class="row mx-1">
                        <h3>Ajout professeur :</h3>
                    </div>

                    <form id="addTeacher">
                        <div class="row justify-content-center ">
                            <div class="col-4">
                                <div class="form-group">
                                    <label for="inputMail" class="form-label mt-4">Selectionnez l'adresse email</label>
                                    <input required type="email" class="form-control" id="inputMail" name="inputMail" aria-describedby="emailHelp" placeholder="Enter email">
                                    <small id="emailHelp" class="form-text text-muted ">Un email automatique sera envoyé au professeur pour ses identifiants</small>
                                </div>
                            </div>

                        

                            <div class="col-3 ">
                                <div class="form-group">
                                    <label for="selectCourseName" class="form-label mt-4">Attribuez les cours* :</label>
                                    <select multiple="" class="form-select" id="selectCourseName" name="selectCourseName" size="3">
                                        ${OptionAsString}
                                    </select>
                                    <small id="" class="form-text text-muted ">*cours : Vous devez sélectionner tous les cours.</small>
                                </div>

                            </div>

                            <div class="col-2  my-auto">
                                <button type="submit" class="btn btn-primary rounded-pill"> Ajouter</button>
                            </div>
                        </div>
                    </form>
                        
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col">
                <div class="container border border-white border-2 rounded-5 my-3 py-1">
                    <div class="row mx-1">
                        <h3>Modification des cours du professeur :</h3>
                    </div>

                    <div class="row mx-3">
                        <h4> Récuperer les infos du professeur : </h4>
                    </div>

                    <form id="recoverCoursesTeacher" class="row justify-content-center">

                        <div class="col-4 my-3">
                            <div class="form-group">
                                <label for="selectMailTeacher" class="form-label mt-4">Selectionnez l'adresse email</label>
                                <select class="form-select" id="selectMailTeacher" name="selectMailTeacher">
                                    ${OptionAsStringForTeachers}
                                </select>

                                <p>Ce professeur est inscrit au cours de : </p>

                                <p>Javascript, BD2.</p>
                            </div>
                        </div>

                        <div class="col-2 align-self-center ">
                            <button type="submit" class="btn btn-info rounded-pill">Obtenir des infos</button>
                        </div>
                    </form>
                

                    <div class="row mx-3 my-2">
                        <h4> Réattribuer des cours au professeur : </h4>
                    </div>

                    <form id="ReallocateCoursesToTeacher" class="row justify-content-center">
                        
                        <div class="col-4">
                            <div class="form-group">
                                <label for="selectMailTeacher" class="form-label mt-4">Selectionnez l'adresse email</label>
                                <select class="form-select" id="selectMailTeacher" name="selectMailTeacher">
                                    ${OptionAsStringForTeachers}
                                </select>
                            </div>
                        </div>
                        
                        <div class="col-3">
                            <div class="form-group">
                                <label for="selectCourses" class="form-label mt-4">Attribuez les cours* :</label>
                                <select multiple="" class="form-select" id="selectCourses"  name="selectCourses" size="3">
                                    ${OptionAsString}
                                </select>
                                <small id="" class="form-text text-muted ">*cours : Vous devez sélectionner tous les cours.</small>
                            </div>

                        </div>

                        <div class="col-2 my-auto">
                            <button type="submit" class="btn btn-primary rounded-pill"> Modifier</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    
    `; 
    main.innerHTML +=  adminPage;
    document.querySelector('#addCourseForm').addEventListener('submit', addCourse);

}

// eslint-disable-next-line no-unused-vars
async function addCourse(e) {
    e.preventDefault();

    const nameCourse = document.querySelector('#coursName').value;
    const codeCourse = document.querySelector('#courseCode').value;
    const descriptionCourse = document.querySelector('#courseTextarea').value;
    const urlPictureCourse = document.querySelector('#courseTextarea').value;


    const options = {
    method: 'POST',
    body: JSON.stringify({
        nameCourse,
        codeCourse,
        descriptionCourse,
        urlPictureCourse
    }),
    headers: {
        'Content-Type': 'application/json',
    },
    };
    // eslint-disable-next-line no-unused-vars
    await fetch(`${process.env.API_BASE_URL}/courses`, options);
}



export default AdminPage;


/* pas mis de required a la ligne 89, 153 */