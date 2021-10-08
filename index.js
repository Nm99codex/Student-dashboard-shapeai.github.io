const userid = () =>
{
    userName = document.querySelector("#UserName").value;
    document.querySelector("#user-name").innerHTML = `${userName}`;
}


let globalTaskData =[];
taskContents = document.getElementById("taskContentsrow");
const taskModal = document.querySelector(".modal-content");

const myDetails = () => {
    const note_details = {
        id : `${Date.now()}`,
        st_name : document.querySelector("#name").value,
        st_enrollment : document.querySelector("#enrollment").value,
        st_institution : document.querySelector("#institution").value,
        st_email : document.querySelector("#email").value,
        st_url : document.querySelector("#url").value,
        st_cplus : document.querySelector("#c_plus").value,
        st_javascript : document.querySelector("#java_script").value
    };

    taskContents.insertAdjacentHTML('beforeend', addDetails(note_details));
    globalTaskData.push(note_details);
    saveToLocalStorage();
}

const addDetails = ({id, st_name, st_enrollment, st_email, st_institution, st_url, st_cplus, st_javascript}) =>
{
    return (`
    <div class = "card col-md-6 col-lg-4 mt-3" id = ${id} key = ${id}>
        <div class="card-header bg-dark d-flex justify-content-between">
            <div class="name_title text-light " style="font-size: 18px;">
                ${st_name}
            </div>
            <div class="elements d-flex justify-content-end">
                <button class="btn btn-success btn-outline-success text-light" type="button" style = "margin-right:10px;" name=${id} onclick="editCard(this)" >Edit</button>
                <button type="button" class="btn btn-outline-danger bg-danger text-light" name = ${id} onclick = "deleteCard(this)">Delete</button>
            </div>
        </div>
        
        <div class="institute text-center">
            ${st_institution}
        </div>

        <div class="email">
            Email id : <span>${st_email}</span>
        </div>

        <div class="enrollment">
            Enroll Number : <span>${st_enrollment}</span>
        </div>

        <div class="marks">
            <div>
                Marks got in C++ : <span>${st_cplus}</span>
                <br>
                Marks got in Javascript : <span>${st_javascript}</span>
            </div>
        </div>
        <hr>
        <div class="percentage text-center">
        Total percentage : <span>${(Number(st_cplus) + Number(st_javascript))/2} %</span>
        </div>
        <a class = "text-center mt-2" style = "text-decoration:none; color:white;"href = ${st_url}"><button class="btn btn-success" type="button" name = ${id} data-bs-toggle="modal" data-bs-target="#result_student" onclick = "showResult()">View github profile</button></a>
    </div>
    `)
}


const saveToLocalStorage = () => {
    localStorage.setItem("dashboard", JSON.stringify({student: globalTaskData}));
}

const reloadTaskCard = () => {
    const localStorageCopy = JSON.parse(localStorage.getItem("dashboard"));
    if(localStorageCopy) {
        globalTaskData = localStorageCopy["student"];
    }
    globalTaskData.map((e) => {
        taskContents.insertAdjacentHTML('beforeend', addDetails(e));
    })
}

const deleteCard = (e) => {
    const targetID = e.getAttribute("name");
    globalTaskData = globalTaskData.filter((data) => data.id!==targetID);
    saveToLocalStorage();
    window.location.reload();
}

const editCard = (e) => {
    if (!e) e = window.event;
    console.log(e.parentNode.parentNode.parentNode.childNodes[9].childNodes[1].childNodes[1])
    // Setting up card elements
    const collegeName = e.parentNode.parentNode.parentNode.childNodes[3];
    const emailAddress = e.parentNode.parentNode.parentNode.childNodes[5].childNodes[1];
    const EnrollmentNumber = e.parentNode.parentNode.parentNode.childNodes[7].childNodes[1];
    const C_plus = e.parentNode.parentNode.parentNode.childNodes[9].childNodes[1].childNodes[1];
    const Java_script = e.parentNode.parentNode.parentNode.childNodes[9].childNodes[1].childNodes[5];
    const saveButton = e.parentNode.childNodes[1];
    
    // Setting EDIT button
    collegeName.setAttribute("contenteditable", "true");
    emailAddress.setAttribute("contenteditable", "true");
    EnrollmentNumber.setAttribute("contenteditable", "true");
    C_plus.setAttribute("contenteditable", "true");
    Java_script.setAttribute("contenteditable", "true");

    collegeName.onclick = () => {
        collegeName.style.cssText = ("border:1px solid black; background : rgb(243, 243, 155); padding:2px; border-radius:4px;");
    }

    emailAddress.onclick = () => {
        emailAddress.style.cssText = ("border:1px solid black; background : rgb(243, 243, 155); padding:2px; border-radius:4px; margin-left:2px;");
    }

    EnrollmentNumber.onclick = () => {
        EnrollmentNumber.style.cssText = ("border:1px solid black; background : rgb(243, 243, 155); padding:2px; border-radius:4px;margin-left:2px;");
    }

    C_plus.onclick = () => {
        C_plus.style.cssText = ("border:1px solid black; background : rgb(243, 243, 155); padding:2px; border-radius:4px;margin-left:2px;");
    }

    Java_script.onclick = () => {
        Java_script.style.cssText = ("border:1px solid black; background : rgb(243, 243, 155); padding:2px; border-radius:4px; margin-left:2px; ");
    }
   

   saveButton.setAttribute("onclick", "saveEdit(this)");
   saveButton.style.setProperty("background","black")
   saveButton.style.setProperty("border", "2px solid yellow")
   saveButton.innerHTML = "Save";
}


const saveEdit = (e) => 
{
    const targetID = e.getAttribute("name");
    const collegeName = e.parentNode.parentNode.parentNode.childNodes[3];
    const emailAddress = e.parentNode.parentNode.parentNode.childNodes[5].childNodes[1];
    const EnrollmentNumber = e.parentNode.parentNode.parentNode.childNodes[7].childNodes[1];
    const C_plus = e.parentNode.parentNode.parentNode.childNodes[9].childNodes[1].childNodes[1];
    const Java_script = e.parentNode.parentNode.parentNode.childNodes[9].childNodes[1].childNodes[5];
    const saveButton = e.parentNode.childNodes[1];
    console.log(saveButton)

    const updateData = {
        collegeName: collegeName.innerHTML,
        emailAddress: emailAddress.innerHTML,
        C_plus: C_plus.innerHTML,
        Java_script: Java_script.innerHTML,
        EnrollmentNumber: EnrollmentNumber.innerHTML,
    };

    let copyBackData = globalTaskData;
    copyBackData = copyBackData.map((information) =>
        information.id === targetID
          ? {
                id: information.id,
                st_name : information.st_name,
                st_institution : updateData.collegeName,
                st_enrollment : updateData.EnrollmentNumber,
                st_email : updateData.emailAddress,
                st_cplus : updateData.C_plus,
                st_javascript : updateData.Java_script
            }
          : information
    );

    globalTaskData = copyBackData;
    
    saveToLocalStorage();
    window.location.reload();
}

