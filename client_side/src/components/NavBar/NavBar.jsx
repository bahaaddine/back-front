import React, { useState, useEffect} from "react";
import axios from "axios";
import { Link} from 'react-router-dom';
 
function Dashboard() {
    const [search,setSearch] =useState('');
    const [record,setRecord] = useState([]);
    const username = JSON.parse(localStorage.getItem('user'));
    const [article, setArticle] = useState({
        nom: "",
        prenom: "",
        fonction: "",
        etablissement: "",
        cin: "",
        badgeNumber: "",
      });
      const {  nom, prenom,fonction,etablissement,cin,badgeNumber} = article;
        const onInputChange = e => {
        setArticle({ ...article, [e.target.name]: e.target.value });

    };


    const loadEmployeeDetail = async () =>  
    {
      var response = fetch('http://localhost:4000/api/Article')
         .then(function(response){
            return response.json();
          })
         .then(function(myJson) {
            setRecord(myJson);
          });
    }
    useEffect(() => {
      loadEmployeeDetail();
    }, []);

    // Insert Employee Records 
    const submitEmployeeRecord = async (e) => {
        e.preventDefault();
        e.target.reset();
        await axios.post("http://localhost:4000/api/Article",article);
        alert('Data Inserted');
         
        loadEmployeeDetail();
    };
    const searchRecords = () =>
    {
        alert(search)
        axios.get(`http://localhost:4000/api/v1/employee/searchRecord/${search}`)
        .then(response => {
          setRecord(response.data);
        });
    }
    const deleteRecord = (ArticleId) =>
    {
      axios.delete(`http://localhost:4000/api/Article/${ArticleId}`)
      .then((result)=>{
        loadEmployeeDetail();
      })
      .catch(()=>{
        alert('Error in the Code');
      });
    };

  return (
    <div>
    <section>  
     
   
    <div class="container">  
    <h4 className="mb-3 text-center mt-4">CRUD Operation in MERN</h4>
    <br />
      <div class="row mt-3">
       <div class="col-sm-4">
          <div className="box p-3 mb-3 mt-5" style={{border:"1px solid #d0d0d0"}}>
            <form onSubmit={submitEmployeeRecord}> 
            <h5 className="mb-3 ">Insert Article Records</h5>
            <br />
                <div class="form-group">
                   <input type="number" class="form-control  mb-4" name="badgeNumber" value={badgeNumber} onChange={e => onInputChange(e)} placeholder="BadgeNumber"></input>
                </div>
                <div class="form-group">
                <label for="startDate">Starting Date:</label>
                <input type="date" id="startDate" name="startDate" required=""></input>
                </div>
                <div class="form-group">
                <label for="startDate">Ending Date:</label>
                <input type="date" id="startDate" name="startDate" required=""></input>
                </div>
                <div class="form-group">
                   <input type="text" class="form-control  mb-4" name="nom"  value={nom} onChange={e => onInputChange(e)} placeholder="Nom" />
                </div>
     
                <div class="form-group">
                   <input type="text" class="form-control mb-4" name="prenom" value={prenom} onChange={e => onInputChange(e)}  placeholder="Prenom" />
                </div>
               
                <div class="form-group">
                   <input type="text" class="form-control mb-4" name="fonction" value={fonction}  onChange={e => onInputChange(e)} placeholder="Fonction" />
                </div>

                <div class="form-group">
                   <input type="text" class="form-control mb-4" name="etablissement" value={etablissement} onChange={e => onInputChange(e)} placeholder="Etablissement" />
                </div>
                <div class="form-group">
                   <input type="number" class="form-control mb-4" name="cin" value={cin} onChange={e => onInputChange(e)} placeholder="CIN" />
                </div>
                <div class="form-group">
                <label for="birthdate">Birthdate:</label>
                <input type="date" id="birthdate" name="birthdate" required=""></input>
                </div>
                <br />
                <div class="form-group">
                <label for="zone">Zone:</label>
                <select id="zone" name="zone">
              <option value="" selected="" disabled="">Choisir une zone</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
            </select>
                </div> 
                <br />

               
                <button type="submit" class="btn btn-primary btn-block mt-4">Insert New article</button>
             </form>
        </div>
      </div>
      <div class="col-sm-8"> 
        <table class="table table-hover  table-striped table-bordered ml-4 ">
            <thead>
           
            </thead>
            <tbody>
     
            { record.map((name)=>
                <tr>
                <td>{name._id}</td>
                <td>{name.image}</td>
                <td>{name.nom}</td>
                <td>{name.prenom}</td>
                <td>{name.fonction}</td>
                <td>{name.etablissement}</td>
                <td>{name.badgeNumber}</td>
        
        
        
                <td>
                      <a  className="text-danger mr-2"
                        onClick={() => {
                          const confirmBox = window.confirm(
                            "Do you really want to delete "+ name.title
                          )
                          if (confirmBox === true) {
                            deleteRecord(name._id)
                          }
                        }}> <i class="far fa-trash-alt" style={{fontSize:"18px",marginRight:"5px"}}></i> </a>
                   
                    <Link class=" mr-2" to={`/update/${name._id}`}>
                       <i class="fa fa-edit" aria-hidden="true"></i> 
                    </Link>
                </td>
                </tr>
                )}  
            </tbody>
        </table>
      </div>
      </div>
    </div>
   </section>
    </div> 
  )
}

export default Dashboard