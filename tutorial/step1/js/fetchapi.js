let studentsList = []; //存放数据的数组
function getStudents(){

    //FetchAPI
    //Fetch always return Promise with resolve
    fetch('http://localhost:3000/contacts').then(response =>{ //返回Permiss对象
        //console.log(response);
        if(response.ok){
          // console.log(response.json());
            return response.json();
            
        }
        else{
            if(response.status == 404){    //404、500、401时
                return Promise.reject(new Error('InValid URL..'))
            }
           else if(response.status == 500){
                return Promise.reject(new Error('Some Internal Error Occured...'));
            }
           else if(response.status == 401){
            return Promise.reject(new Error('UnAuthorized User..'));
           }
        }
        
    }).then(studentsListResponse =>{
        studentsList = studentsListResponse;  //值赋给studentsList对象
       // console.log('studentsList', studentsList);
       displayReposToHTML(studentsListResponse);  //显示数据
    }).catch(error =>{
        let errorEle = document.getElementById('errMessage'); //通过ID为errMessage的元素显示错误信息
        errorEle.innerText = error.message;
    })

}


function displayReposToHTML(studentsListResponse){
    //logic
    //console.log('Response',repositoriesList);
  // let tableEle =  document.getElementById('repo-list-table');

    let tableEle = document.getElementsByTagName('table')[0];  //html中的第一个table

    let tbodyEle = tableEle.getElementsByTagName('tbody')[0];   //table元素中的第一个body
  //console.log(tbodyEle);
    let tbodyEleInnerHTMLString = '';

    studentsListResponse.forEach(student =>{
   //     console.log(repo.web_url + '--'+repo.owner.username );
     tbodyEleInnerHTMLString += `
                <tr>
                    <td onclick=clickaction(this)>${student.name}</td>    //鼠标点击该元素时，输入框更新数据
                    <td onclick=clickaction(this)>${student.email}</td>
                    <td onclick=clickaction(this)>${student.contactno}</td>
                    <td><button class='btn btn-primary' onclick='updateStudent(${student.id})'>Update</button></td>
                    <td ><i class='fa fa-trash' style='color:red;font-size:1.2em;cursor:pointer' onclick='deleteStudent(${student.id})'></i></td>
                </tr>
     `;   
    });

    tbodyEle.innerHTML = tbodyEleInnerHTMLString;
}

function clickaction(td){
   //alert(td.innerText);
   
   var textBox = document.createElement("INPUT");  //对应点击元素展示成输入框
   var value = td.innerText;
   textBox.type = "text";
   textBox.className="EditCell_TextBox";
   if(!value){  
        value = element.getAttribute("Value");  
    }    
    textBox.onblur = function (){  
        cancelEditCell(this.parentNode, this.value);  
    }  
   td.innerText = "";           //预备填充新字符串
   textBox.value = value;  
   td.appendChild(textBox);
   textBox.focus();
   textBox.select();
   td.value=textBox.value;       
  // alert(textBox.innerText);

}
//adding student to db
function addStudent(event){
    event.preventDefault();
  //  console.log('addStudent');
 let name =  document.getElementById('name').value;    //通过ID获值
 let email = document.getElementById('email').value;
 let contactno = document.getElementById('contactno').value;
//组装为json元素
 let student = {
     name : name,
     email : email,
     contactno: contactno
 }

 //console.log(name + ' --' + email + " ---" + contactno);
  fetch('http://localhost:3000/contacts',{
      method: 'POST',      //POST请求
      headers:{
        'content-type': 'application/json'
      },
      body:JSON.stringify(student)
  }).then(response =>{
      if(response.ok){
          return response.json();
      }
      else{
          return Promise.reject(new Error('Some internal error occured...'))
      }
  }).then(addedStudent =>{
      console.log('addedStudent -->', addedStudent);
    //   let tableEle = document.getElementsByTagName('table')[0];

    //   let tbodyEle = tableEle.getElementsByTagName('tbody')[0];

    //   console.log(tbodyEle.innerHTML);
        let tbodyEle = document.getElementById('table-body');
        console.log(tbodyEle);
        
      
      
  }).catch(error=>{
    //ADd this to html
    let errorEle = document.getElementById('errMessage');
        errorEle.innerText = error.message;
  })
}

function deleteStudent(id){
    console.log('delete Student--',id);
    
    fetch(`http://localhost:3000/contacts/${id}`,{
        method:'DELETE'
    }).then(response =>{
        if(response.ok){
            return response.json();
        }
    }).then(result =>{
        console.log('result from delete',result);
        //write the code for DOM manipulation
    })
}
function updateStudent(id){

  console.log('update Student--',id);
  let newName =  document.getElementById('name').value;
  let newEmail = document.getElementById('email').value;
  let newContactno = document.getElementById('contactno').value;
  
  let newStudent = {
     name : newName,
     email : newEmail,
     contactno: newContactno
 }
 //alert(id);
  fetch('http://localhost:3000/contacts/${id}',{
    method: 'PUT',
	headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(student)
  }).then(response =>{
    if (response.ok) {
      return response.json();
    }
  } else {
	  return Promise.reject(new Error('Some internal error occured...'));
  }
  }).then(updatedStudent => {

        console.log('updatedStudent -->', updatedStudent);
		studentsList.splice(studentsList.findIndex(studentjson => studentjson.id == id)
		, 1, updatedStudent); 
		displayReposToHTML(studentsList);
}
