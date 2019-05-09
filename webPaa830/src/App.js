const Router = ReactRouter.Router;
const Route = ReactRouter.Route;
const IndexRoute = ReactRouter.IndexRoute;
const Link = ReactRouter.Link;
const browserHistory = ReactRouter.browserHistory ;

const Button = ReactBootstrap.Button;
const Modal = ReactBootstrap.Modal;
const Nav = ReactBootstrap.Nav;
const Navbar = ReactBootstrap.Navbar;
const NavItem = ReactBootstrap.NavItem;
const NavDropdown = ReactBootstrap.NavDropdown;
const MenuItem = ReactBootstrap.MenuItem;

const Grid = ReactBootstrap.Grid;
const Row = ReactBootstrap.Row;
const Panel = ReactBootstrap.Panel;

const Pagination = ReactBootstrap.Pagination;

const Form = ReactBootstrap.Form;
const FormGroup = ReactBootstrap.FormGroup;
const FormControl = ReactBootstrap.FormControl;
const ControlLabel = ReactBootstrap.ControlLabel;
const Col = ReactBootstrap.Col;

const Table = ReactBootstrap.Table;

const Autosuggest = Autosuggest;

const moment = moment;

const API_URL = 'http://localhost'; 
//const API_URL = 'http://159.203.156.208';

const API_HEADERS = {

    'Content-Type':'application/json',
    Authentication: 'any-string-you-like'
}

const TOKEN_KEY = "token";

const languageActive = false;

function token(){
    
       return localStorage.getItem(TOKEN_KEY);
}

class App extends React.Component{

  constructor(){

      super();
      this.state = {

          cookies: false
      }
  }

  componentDidMount(){

      fetch(API_URL+'/cookies',{headers: API_HEADERS})
      .then((response)=>response.json())
      .then((responseData)=>{
          this.setState({

              cookies: responseData
          })
      })
      .catch((error)=>{
          console.log('Error fetching and parsing data', error);
      })




  }

  setCookie(event){

      event.preventDefault();

      let newCookie = {

          "id":"1",
          "username": event.target.email.value,
          "password": event.target.password.value
      }

      fetch(API_URL+'/login', {

        method: 'post',
        headers: API_HEADERS,
        body: JSON.stringify(newCookie)
    }).then(response => response.json()).then(response => {
        if(response.token!=undefined){
          localStorage.setItem(TOKEN_KEY, response.token)
        }
    }); 
    
    window.location.reload();

  }

    isAuthenticated(){

        return !!localStorage.getItem(TOKEN_KEY);
    }

    setRegistration(event){

        event.preventDefault();

        let newCookie = {

            "id":"1",
            "username": event.target.email.value,
            "password": event.target.password.value
        }

        fetch(API_URL+'/register', {

            method: 'post',
            headers: API_HEADERS,
            body: JSON.stringify(newCookie)
        })


        window.location.reload();

    }



  render() {

    let dashboard = (

          <div>
            <Toolbar />
            <div className="container">
                {this.props.children}
            </div>
          </div>

    )

    let login = (

          <div>
            {/* <Registration */}
            <Login
                    setcookie={this.setCookie}
                    setregistration={this.setRegistration}

            />
          </div>

    )
    if(this.isAuthenticated()){

        return (

            <div>
                {dashboard}
            </div>
        )
    }
        return (

            <div>
                {login}
            </div>
        )
  }
}

class Actions extends React.Component{

    constructor(){

          super();
          this.state = {

              masterAPI: [],
              parameter: ''
          }

    }

    componentDidMount(){

          fetch(API_URL+'/master',{headers: API_HEADERS})
          .then((response)=>response.json())
          .then((responseData)=>{
              this.setState({

                  masterAPI: responseData
              })
          })
          .catch((error)=>{
              console.log('Error fetching and parsing data', error);
          })

          this.setState({

             parameter: this.props.params.actionid
          });

    }

    onPrinted(){

        window.print();

        window.location.href = '/';
    }

    render(){

        return(
            <div>
                <ActionsTable
                                parameter={this.state.parameter}

masterAPI={this.state.masterAPI.filter((master)=> master.id
==this.state.parameter)}
                />
                <Button onClick={this.onPrinted.bind(this)} >i&nbsp;</Button>
            </div>
        );
    }
}

class ActionsTable extends React.Component{


    render(){

let today = moment(new Date()).format('DD-MM-YYYY');

        return(

            <div  id="printcss" style={{'margin':'0'}}>
                <Grid>
                    <Row>
                        <Col xs={12}>
                            <img src="/logoprint.png"/>
                            <h5>"Novara Beauty Salon - Spa "</h5>
                            <h5>Ubicado en la calle 12 de Julio esq. Gral Roman</h5>
                            <h5>Tel.: 809-535-5500</h5>
                            <br/>
                            <br/>
                            <h5 className="col-xs-offset-7">Fecha:
{today}</h5>
                            <br/>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12}>
                            <Table striped bordered condensed hover
style={{'position':'relative','width':'55%', 'margin':'0'}}>
                                <thead>
                                  <tr>
                                    <th style={{'width':'15px',
'font-size':'25px', 'border-spacing':'0 30px'}}>#</th>
                                    <th style={{'width':'15px',
'font-size':'25px'}}>Articulo</th>
                                    <th style={{'width':'15px',
'font-size':'25px'}}>Precio</th>
                                    <th style={{'width':'15px',
'font-size':'25px'}}>Peluquera</th>
                                  </tr>
                                </thead>
                                    {this.props.masterAPI.map(
                                        (master,index) => <ActionsTableBody
                                                                 key={index}
                                                                 index={index}
                                                                 id={master.id}

item={master.item}
                                                          />
                                    )}
                                <tfoot>
                                    <ActionsTableBodyFooter
                                                 parameter =
{this.props.parameter}
                                                 masterAPI =
{this.props.masterAPI}
                                    />
                                </tfoot>

                              </Table>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

class ActionsTableBodyFooter extends React.Component{

    render(){

        let nextState = this.props.masterAPI;

        let zoom = 0;

        if(nextState[0]){

            zoom = nextState[0].project;
        }

        return(
            <tr>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td style={{'width':'15px', 'font-size':'20px'}}>Total</td>
                <td style={{'width':'15px',
'font-size':'20px'}}>RD${zoom}.00</td>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
            </tr>
        );
    }

}

class ActionsTableBody extends React.Component{

    render(){

        return(

                <tbody>
                {this.props.item.map(
                    (master, index) =>  <ActionsTableBodyDetail
                                                key={index}
                                                index={index+1}
                                                id={master.id}
                                                name={master.firstname}
                                                item={master.item}
                                                development={master.development}
                                                project={master.project}
                                        />
                )}
               </tbody>
        );
    }
}

class ActionsTableBodyDetail extends React.Component{

    render(){

        return(
            <tr>
                    <td style={{'font-size':'20px'}}>&nbsp;</td>
                    <td style={{'font-size':'20px'}}>{this.props.item}</td>
                    <td
style={{'font-size':'20px'}}>{this.props.project}.00</td>
                    <td
style={{'font-size':'20px'}}>{this.props.development}</td>
            </tr>
        );
    }
}

class Login extends React.Component{

    render(){

        return(

            <div id="login">
                <div className="container">
                    <div className="row vertical-offset-100">
                        <div className="col-md-4 col-md-offset-4">
                            <div className="panel panel-default">
                                <div className="panel-heading">
                                    <h3 className="panel-title">Please
sign in</h3>
                                </div>
                                <div className="panel-body">
                                    <form
onSubmit={this.props.setcookie.bind(this)}>
                                    <fieldset>
                                        <div className="form-group">
                                            <input
className="form-control" placeholder="E-mail" name="email"
type="text"/>
                                        </div>
                                        <div className="form-group">
                                            <input
className="form-control" placeholder="Password" name="password"
type="password"/>
                                        </div>
                                        <div className="checkbox">
                                            <label>
                                                <input name="remember" type="checkbox" value="Remember Me"/> Remember Me
                                            </label>
                                        </div>
                                            <button  className="btn btn-lg btn-success btn-block">Login</button>
                                    </fieldset>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }

}

class Toolbar extends React.Component{

    componentDidMount(){

        document.body.style.backgroundImage = "none";

    }

    onClicked(){

        localStorage.removeItem(TOKEN_KEY)
        window.location.reload();
    }

    onRefreshed(){
        window.location.reload();
    }

    render(){

        let toolbarES = (

            <Navbar>
                    <div className="navbar-header">
                        <div className="navbar-brand">
                            <Link to={'/'} onClick={this.onRefreshed.bind(this)}>Info-Solutions SYS</Link>
                        </div>
                    </div>
                    <Nav>
                      <li><Link to={'/master'}>Facturacion</Link></li>
                      <li><Link to={'/detail'}>Inventario</Link></li>
                      <NavDropdown eventKey={3} title="Reportes" id="basic-nav-dropdown">
                            <MenuItem eventKey={3.1}><Link to="/partials">Cuadre</Link></MenuItem>
                            <MenuItem eventKey={3.2}><Link to="/bipartials">Resume Cuadre por Peluquera</Link></MenuItem>
                            <MenuItem eventKey={3.3}><Link to="/tripartials">Resumen Cuadre General</Link></MenuItem>
                            <MenuItem divider />
                            <MenuItem eventKey={3.4}><Link to="/agregar_peluquera">Agregar Peluquera</Link></MenuItem>
                      </NavDropdown>
                      <NavDropdown style={{'float':'right','position':'absolute','left':'80%'}} eventKey={3} title="Perfil Usuario" id="basic-nav-dropdown">
                            <MenuItem eventKey={3.1}><Link to="/account">Cuenta de Usuario</Link></MenuItem>
                            <MenuItem eventKey={3.2}><Link onClick={this.onClicked} to="/logout">Log Out</Link></MenuItem>
                      </NavDropdown>                      
                    </Nav>
                </Navbar>
        );

        let toolbarEN = (

            <Navbar>
                    <div className="navbar-header">
                        <div className="navbar-brand">
                            <Link to={'/'}
onClick={this.onClicked.bind(this)}>React-Bootstrap</Link>
                        </div>
                    </div>
                    <Nav>
                      <li><Link to={'/master'}>Master</Link></li>
                      <li><Link to={'/detail'}>Details</Link></li>
                      <NavDropdown eventKey={3} title="DropDown"
id="basic-nav-dropdown">
                            <MenuItem eventKey={3.1}><Link
to="/partials">Draw</Link></MenuItem>
                            <MenuItem eventKey={3.2}>Another action</MenuItem>
                            <MenuItem eventKey={3.3}>Something else
here</MenuItem>
                            <MenuItem divider />
                            <MenuItem eventKey={3.4}>Separated link</MenuItem>
                      </NavDropdown>
                      <li
style={{'float':'right','position':'absolute','left':'80%'}}><Link
onClick={this.onClicked} to={'/logout'}>Logout</Link></li>
                    </Nav>
                </Navbar>
        );

        if(languageActive){


            return(
                    <div>
                        {toolbarEN}
                    </div>
            );
        }else{
            return(
                    <div>
                        {toolbarES}
                    </div>
            );
        }
    }

}

class About extends React.Component{

    render(){

        return(

            <h1>About</h1>
        );
    }
}

class Repos extends React.Component{

    render(){

        return(

            <h1>Repos {this.props.params.repo_name}</h1>
        );
    }
}

class Master extends React.Component{

    constructor() {

        super();
        this.state = {
            showModal: false,
            filterText: '',
            activePage: 1,
            masterAPI: [],
            masterDetail: []
        };
    }

    componentDidMount(){

          fetch(API_URL+'/master',{headers: API_HEADERS})
          .then((response)=>response.json())
          .then((responseData)=>{
              this.setState({

                  masterAPI: responseData
              })
          })
          .catch((error)=>{
              console.log('Error fetching and parsing data', error);
          })

          this.setState({

             parameter: this.props.params.actionid
          });

    }

    close() {
        this.setState({
            showModal: false
        });
    }

    open() {
        this.setState({
            showModal: true
        });
    }

    onSaveMaster(event){

        event.preventDefault();

let today = moment(new Date()).format('YYYY-MM-DD');

        let details = this.state.masterDetail;

        let name = details[0].firstname;

        let zoom = 0;

        for(var x=0;x<details.length;x++){
            zoom+=parseInt(details[x].project);
        }

        let newMaster = {

            "id": Date.now(),
            "date": today,
            "name": name,
            "item": this.state.masterDetail,
            "project": zoom,
            "status":"pending"

        }

        let nextState = this.state.masterAPI;

        nextState.push(newMaster);

        this.setState({

            masterAPI: nextState
        });

        this.setState({
            showModal: false,
            masterDetail: []
        });

        fetch(API_URL+'/master', {

              method: 'post',
              headers: API_HEADERS,
              body: JSON.stringify(newMaster)
        })

    }

    onSaveDetail(event){

        event.preventDefault();

        let nextState = this.state.masterDetail;

        let newItem = {

            "id": Date.now(),
            "firstname":event.target.firstname.value,
            "item":event.target.suggest.value,
            "development":event.target.development.value,
            "project":event.target.project.value,
        }

        nextState.push(newItem);

        this.setState({

            masterDetail: nextState
        });

    }

    onDeleteMaster(value){

        let nextState = this.state.masterAPI;

        var index = nextState.findIndex(x=> x.id==value);

        nextState.splice(index,1);

        this.setState({

            masterAPI: nextState
        });

        fetch(API_URL+'/deletemaster', {

              method: 'post',
              headers: API_HEADERS,
              body: JSON.stringify({"id":index})
        })
    }

    onHandleUserInput(event){


        this.setState({

            filterText: event.target.value
        });
    }

    handleSelect(eventKey){

        this.setState({

            activePage: eventKey
        });

    }


    render(){

        let ModalButtonEN = (


                <Button onClick={this.open.bind(this)}>Add Master</Button>


        );

        let ModalButtonES = (

                <Button onClick={this.open.bind(this)}>Agregar
Factura</Button>


        );

        let MasterTableEN = (

            "Master List"

        );

        let MasterTableES = (

            "Listado de Facturas"

        );

        let ModalButtonActive;

        let MasterTableActive;

        if(languageActive){

           ModalButtonActive=ModalButtonEN
           MasterTableActive=MasterTableEN
        }else{

           ModalButtonActive=ModalButtonES
           MasterTableActive=MasterTableES
        }

        return(
            <div>
                <Row>
                    <MasterSearch
                                    filterText={this.state.filterText}
                                    masterCallback = {{

onsavedetail:this.onSaveDetail.bind(this),

onsavemaster:this.onSaveMaster.bind(this),

onhandleuserinput:this.onHandleUserInput.bind(this)
                                    }}

                    />
                </Row>
                <Row>
                        <div className="pull-right">
                            {ModalButtonActive}
                            <MasterModal


masterDetail={this.state.masterDetail}
                                            showModal={this.state.showModal}
                                            open={this.open}
                                            close={this.close.bind(this)}
                                            masterCallback = {{


onsavedetail:this.onSaveDetail.bind(this),

onsavemaster:this.onSaveMaster.bind(this)
                                            }}
                            />
                        </div>
                </Row>
                <br/>
                <Row>
                    <Panel header={MasterTableActive}>
                        <MasterTable
                                        filterText={this.state.filterText}
                                        masterData={this.state.masterAPI}
                                        masterCallback = {{

onsavedetail:this.onSaveDetail.bind(this),

onsavemaster:this.onSaveMaster.bind(this),

ondeletemaster:this.onDeleteMaster.bind(this)
                                        }}
                        />
                        <div className="pull-right">
                            <MasterPagination
                                                masterCallback={{
                                                      handleSelect:
this.handleSelect.bind(this)
                                                }}

activePage={this.state.activePage}
                            />
                        </div>
                    </Panel>
                </Row>
            </div>
        );
    }
}

class MasterPagination extends React.Component{

    render(){

        return(
            <div>
                <Pagination
                  prev
                  next
                  first
                  last
                  ellipsis
                  boundaryLinks
                  bsSize="small"
                  items={5}
                  activePage={this.props.activePage}
                  onSelect={this.props.masterCallback.handleSelect}
                  />
                  <br />
            </div>
        );
    }
}

class MasterSearch extends React.Component{

    render(){

        let MasterSearchEN = (

            <div>
                <Panel header="Search Master">
                  <form>
                    <div className="form-group">
                        <div className="col-md-2 col-sm-2">
                          <label>Search:</label>
                        </div>
                        <div className="col-md-10 col-sm-10">
                          <input
onChange={this.props.masterCallback.onhandleuserinput.bind(this)}
                                 type="text"
                                 className="form-control"
id="first_name" name="first_name"/>
                        </div>
                    </div>
                  </form>
                </Panel>
            </div>
        );

        let MasterSearchES = (

            <div>
                <Panel header="Busqueda de Factura">
                  <form>
                    <div className="form-group">
                        <div className="col-md-2 col-sm-2">
                          <label>Buscar:</label>
                        </div>
                        <div className="col-md-10 col-sm-10">
                          <input
onChange={this.props.masterCallback.onhandleuserinput.bind(this)}
                                 type="text"
                                 className="form-control"
id="first_name" name="first_name"/>
                        </div>
                    </div>
                  </form>
                </Panel>
            </div>
        );

        if(languageActive){
            return(
                <div>
                    {MasterSearchEN}
                </div>
            );
        }else{
            return(
                <div>
                    {MasterSearchES}
                </div>
            );
        }
    }
}

class MasterTable extends React.Component{

    render(){

        let filteredMaster = this.props.masterData.filter(

            (master) => master.name.indexOf(this.props.filterText) !== -1
        );

        let MasterTableEN = (

            <tr>
                <th>#</th>
                <th>Date</th>
                <th>Name</th>
                <th>Item</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
        );

        let MasterTableES = (

            <tr>
                <th>#</th>
                <th>Fecha</th>
                <th>Nombre</th>
                <th>Articulo</th>
                <th>Estatus</th>
                <th>Acciones</th>
              </tr>
        );

        let MasterTableActive;

        if(languageActive){

            MasterTableActive=MasterTableEN
        }else{

            MasterTableActive=MasterTableES
        }

        return(
            <div>

                    <Table striped bordered condensed hover>
                        <thead>
                          {MasterTableActive}
                        </thead>
                        <tbody>
                        {filteredMaster.map(
                            (master, index) => <MasterTableBody
                                                                key={master.id}
                                                                id={master.id}

date={master.date}

name={master.name}

items={master.name}

status={master.status}

masterCallback={this.props.masterCallback}
                                                />
                        )}
                        </tbody>
                      </Table>

                </div>
        );
    }
}

class MasterTableBody extends React.Component{

    render(){

        return(
                <tr>
                    <td>{this.props.id}</td>
                    <td>{this.props.date}</td>
                    <td>{this.props.name}</td>
                    <td>{this.props.items}</td>
                    <td>{this.props.status}</td>
                    <td>
                        <Link className="btn btn-default"
to={'/actions/'+this.props.id}><i className="fa fa-eye"
aria-hidden="true"></i></Link>{' '}
<Button onClick={this.props.masterCallback.ondeletemaster.bind(this,this.props.id)}><i
className="fa fa-trash" aria-hidden="true"></i></Button>
                    </td>
                  </tr>
        );
    }
}

class MasterModalButton extends React.Component{

    render(){

        let MasterModalButtonEN = (


                <Col md={12}>
                    <Button style={{'margin-left':'70%'}}
bsStyle={'default'}
onClick={this.props.masterCallback.onsavemaster.bind(this)}>Save</Button>
                </Col>

        );

        let MasterModalButtonES = (


                <Col md={12}>
                    <Button style={{'margin-left':'70%'}}
bsStyle={'default'}
onClick={this.props.masterCallback.onsavemaster.bind(this)}>Guardar</Button>
                </Col>

        );

        let MasterModalButtonActive;

        if(languageActive){

            MasterModalButtonActive=MasterModalButtonEN
        }else{

            MasterModalButtonActive=MasterModalButtonEN
        }


        return(
            <Row>
                {MasterModalButtonActive}
            </Row>

        );
    }
}

class MasterModal extends React.Component{



    render(){

        let MasterModalEN = (

            <Modal.Title>Modal Header</Modal.Title>
        );

        let MasterModalES = (

            <Modal.Title>Agregar Factura</Modal.Title>
        );

        let MasterModalActive;

        if(languageActive){

            MasterModalActive=MasterModalEN
        }else{

            MasterModalActive=MasterModalES
        }


        return(

            <div >
                <Modal show={this.props.showModal} onHide={this.props.close}>
                  <Modal.Header closeButton>
                    {MasterModalActive}
                  </Modal.Header>
                  <Modal.Body>
                        <MasterModalField
masterCallback={this.props.masterCallback}
                        />
                        <br/>
                        <MasterModalTable
masterDetail={this.props.masterDetail }

masterCallback={this.props.masterCallback}
                        />
                        <MasterModalButton
masterCallback={this.props.masterCallback}
                        />
                  </Modal.Body>
                </Modal>
              </div>
        );
    }
}

const languages = [
  {
    name: 'LAVADO',
    year: 1972
  },
  {
    name: 'PELO CORTO',
    year: 2000
  },
  {
    name: 'PELO LARGO',
    year: 1983
  },
  {
    name: 'EXTENSIONES',
    year: 2007
  },
  {
    name: 'LAVADO CON LINEA',
    year: 2012
  },
  {
    name: 'TRATAMIENTO PROFUNDO',
    year: 2009
  },
  {
    name: 'CELOFEN',
    year: 1990
  },
  {
    name: 'CEJAS',
    year: 1995
  },
  {
    name: 'POSTURAS DE UNAS',
    year: 1995
  },
  {
    name: 'PINTADAS',
    year: 1987
  },
  {
    name: 'MANOS Y PIES',
    year: 1995
  },
  {
    name: 'KERATINA',
    year: 1991
  },
  {
    name: 'Ruby',
    year: 1995
  },
  {
    name: 'ALIZADO',
    year: 2003
  }
];

function escapeRegexCharacters(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function getSuggestions(value) {

    const escapedValue = escapeRegexCharacters(value.trim());

      if (escapedValue === '') {
        return [];
      }

      const regex = new RegExp('^' + escapedValue, 'i');

      return languages.filter(language => regex.test(language.name));

}

function renderSuggestion(suggestion) {
  return (
    <span>{suggestion.name}</span>
  );
}

function getSuggestionValue(suggestion) {
  return suggestion.name;
}

class MasterModalField extends React.Component{

    constructor(){

        super();
        this.state = {

            value: '',
            suggestions: [],
            peluqueraData: []
        }
    }

    componentDidMount(){

        fetch(API_URL+'/peluquera',{headers: API_HEADERS})
        .then((response)=>response.json())
        .then((responseData)=>{
            this.setState({

                peluqueraData: responseData
            })

        })
        .catch((error)=>{
            console.log('Error fetching and parsing data', error);
        })

}


    onChange(event, {newValue,method}){
        this.setState({

            value: newValue
        });
    }

    onSuggestionsFetchRequested({value}){
        this.setState({

            suggestions: getSuggestions(value)
        });
    }

    onSuggestionsClearRequested(){

        this.setState({
          suggestions: []
        });

    }



    render(){

        const { value, suggestions } = this.state;
        const inputProps = {
          placeholder: "Type 'c'",
          value,
          onChange: this.onChange.bind(this)
        };

        let MasterModalFieldEN = (

                <Row>
                    <Form
onSubmit={this.props.masterCallback.onsavedetail.bind(this)}>
                        <Row>
                            <FormGroup controlId="formHorizontalName">
                              <Col componentClass={ControlLabel} md={1} sm={2}>
                                Name
                              </Col>
                              <Col md={4} sm={6}>
                                <FormControl type="text"
name="firstname" placeholder="Name" required />
                              </Col>
                            </FormGroup>
                        </Row>
                        <br/>
                        <Row>
                            <FormGroup controlId="formHorizontalItem">
                                  <Col componentClass={ControlLabel}
md={1} sm={2}>
                                    Item
                                  </Col>
                                  <Col md={4} sm={6}>
                                    <Autosuggest
                                               suggestions={suggestions}

onSuggestionsFetchRequested={this.onSuggestionsFetchRequested.bind(this)}

onSuggestionsClearRequested={this.onSuggestionsClearRequested.bind(this)}

renderSuggestion={renderSuggestion}

getSuggestionValue={getSuggestionValue}
                                               inputProps={inputProps}
                                    />
                                  </Col>
                            </FormGroup>
                        </Row>
                        <br/>
                        <Row>
                            <FormGroup controlId="formControlsSelect">
                                <Col md={1} sm={2}>
                                  <ControlLabel>List</ControlLabel>
                                </Col>
                                <Col md={4} sm={6}>
                                  <FormControl componentClass="select"
name="development" placeholder="List" required >
                                    <option value="select">Select</option>
                                    <option value="...">...</option>

                                  </FormControl>
                                </Col>
                            </FormGroup>
                        </Row>
                        <br/>
                        <Row>
                            <FormGroup controlId="formHorizontalName">
                              <Col componentClass={ControlLabel} md={1} sm={2}>
                                Project
                              </Col>
                              <Col md={4} sm={6}>
                                <FormControl type="text"
name="project" placeholder="Project" required />
                              </Col>
                              <Col md={2} sm={2} >
                                    <Button type="submit"><i
className="fa fa-plus" aria-hidden="true"></i></Button>
                              </Col>
                            </FormGroup>
                        </Row>
                        <br/>
                        <Row>
                            <input
style={{'width':'70px','display':'none'}} type="text" name="suggest"
placeholder="Name" value={this.state.value} />
                        </Row>
                    </Form>

                  </Row>
        );

        let MasterModalFieldES = (

                <Row>
                    <Form
onSubmit={this.props.masterCallback.onsavedetail.bind(this)}>
                        <Row>
                            <FormGroup controlId="formHorizontalName">
                              <Col componentClass={ControlLabel} md={1} sm={2}>
                                Cliente
                              </Col>
                              <Col md={4} sm={6}>
                                <FormControl type="text"
name="firstname" placeholder="Cliente" required />
                              </Col>
                            </FormGroup>
                        </Row>
                        <br/>
                        <Row>
                            <FormGroup controlId="formHorizontalItem">
                                  <Col componentClass={ControlLabel}
md={1} sm={2}>
                                    Articulo
                                  </Col>
                                  <Col md={4} sm={6}>
                                    <Autosuggest
                                               suggestions={suggestions}

onSuggestionsFetchRequested={this.onSuggestionsFetchRequested.bind(this)}

onSuggestionsClearRequested={this.onSuggestionsClearRequested.bind(this)}

renderSuggestion={renderSuggestion}

getSuggestionValue={getSuggestionValue}
                                               inputProps={inputProps}
                                    />
                                  </Col>
                            </FormGroup>
                        </Row>
                        <br/>
                        <Row>
                            <FormGroup controlId="formControlsSelect">
                                <Col md={1} sm={2}>
                                  <ControlLabel>Peluquera</ControlLabel>
                                </Col>
                                <Col md={4} sm={6}>
                                  <FormControl componentClass="select" name="development" placeholder="Peluquera" required >
                                    {this.state.peluqueraData.sort((a,b)=>a.name>b.name).map(
                                        item => <option value={item.name}>{item.name}</option>                                    
                                    )}
                                  </FormControl>
                                </Col>
                            </FormGroup>
                        </Row>
                        <br/>
                        <Row>
                            <FormGroup controlId="formHorizontalName">
                              <Col componentClass={ControlLabel} md={1} sm={2}>
                                Precio
                              </Col>
                              <Col md={4} sm={6}>
                                <FormControl type="text"
name="project" placeholder="Precio" required />
                              </Col>
                              <Col md={2} sm={2} >
                                    <Button type="submit"><i
className="fa fa-plus" aria-hidden="true"></i></Button>
                              </Col>
                            </FormGroup>
                        </Row>
                        <br/>
                        <Row>
                            <input
style={{'width':'70px','display':'none'}} type="text" name="suggest"
placeholder="Name" value={this.state.value} />
                        </Row>
                    </Form>

                  </Row>
        );

        let MasterModalFieldActive;

        if(languageActive){

            MasterModalFieldActive=MasterModalFieldEN
        }else{
            MasterModalFieldActive=MasterModalFieldES
        }

        return(
            <Grid>
                {MasterModalFieldActive}
            </Grid>
        );
    }
}

class MasterModalTable extends React.Component{


    render(){

        let MasterModalTableEN = (

              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Item</th>
                <th>Development</th>
                <th>Project</th>
              </tr>
        );

        let MasterModalTableES = (

              <tr>
                <th>#</th>
                <th>Nombre</th>
                <th>Articulo</th>
                <th>Peluquera</th>
                <th>Precio</th>
              </tr>
        );

        let MasterModalActive;

        if(languageActive){

            MasterModalActive=MasterModalTableEN
        }else{

            MasterModalActive=MasterModalTableES
        }

        return(

            <div>
                <Table striped bordered condensed hover>
                    <thead>
                      {MasterModalActive}
                    </thead>
                    <tbody>
                        {this.props.masterDetail.map(
                            (masterdetail,index) => <MasterModalTableBody
                                                         index={index+1}
                                                         key={index}
                                                         id={masterdetail.id}

firstname={masterdetail.firstname}

item={masterdetail.item}

development={masterdetail.development}

project={masterdetail.project}
                                              />
                        )}
                    </tbody>
                  </Table>
            </div>
        );
    }
}

class MasterModalTableBody extends React.Component{

    render(){

        return(

            <tr>
                <td>{this.props.index}</td>
                <td>{this.props.firstname}</td>
                <td>{this.props.item}</td>
                <td>{this.props.development}</td>
                <td>{this.props.project}</td>
            </tr>

        );
    }

}

class Detail extends React.Component{

    constructor() {

        super();
        this.state = {
            showModal: false,
            filterText: '',
            detailData: []
        }
    }

    componentDidMount(){

          fetch(API_URL+'/detail',{headers: API_HEADERS})
          .then((response)=>response.json())
          .then((responseData)=>{
              this.setState({

                  detailData: responseData
              })

          })
          .catch((error)=>{
              console.log('Error fetching and parsing data', error);
          })

    }

    close() {
        this.setState({
            showModal: false
        });
    }

    open() {
        this.setState({
            showModal: true
        });
    }

    onSaveDetail(event){

        event.preventDefault();

        let today = moment(new Date()).format('YYYY-MM-DD');

        let newDetail = {

            "id": Date.now(),
            "date": today,
            "id": event.target.id.value,
            "name": event.target.name.value,
            "item": event.target.item.value,
            "environment": event.target.environment.value
        }

        let nextState = this.state.detailData;

        nextState.push(newDetail);


        fetch(API_URL+'/detail', {

              method: 'post',
              headers: API_HEADERS,
              body: JSON.stringify(newDetail)
        })

        this.setState({

            detailData: nextState,
            showModal: false
        });

    }

    onHandleChange(event){

        this.setState({

            filterText: event.target.value
        });
    }

    onUpdated(value){

        console.log(value);
    }

    onDeleted(value){

        let nextState = this.state.detailData;

        var index = nextState.findIndex(x=> x.id==value);

        nextState.splice(index,1);

        this.setState({

            detailData: nextState
        });

        fetch(API_URL+'/deletedetail', {

              method: 'post',
              headers: API_HEADERS,
              body: JSON.stringify({"index":index,"id":value})
        })
    }

    render(){

        let DetailEN = (

            <Button onClick={this.open.bind(this)}>Add Detail</Button>
        );

        let DetailES = (

            <Button onClick={this.open.bind(this)}>Agregar Articulo</Button>
        );

        let DetailActive;

        if(languageActive){
            DetailActive=DetailEN
        }else{
            DetailActive=DetailES
        }

        return(
            <Grid>

                <Row>
                    <DetailSearch
                                    filterText={this.state.filterText}
                                    detailCallback={{
                                                onHandleChange:
this.onHandleChange.bind(this)
                                    }}
                    />
                </Row>
                <Row>
                        <div className="pull-right">
                            {DetailActive}
                            <DetailModal showModal={this.state.showModal}
                                            detailCallback={{
                                                open:this.open,
                                                close:this.close.bind(this),

onsavedetail:this.onSaveDetail.bind(this)
                                            }}
                            />
                        </div>
                </Row>
                <br/>
                <Row>
                    <DetailTable
                                    filterText={this.state.filterText}
                                    detailData={this.state.detailData}
                                    detailCallback={{
                                              onUpdated:
this.onUpdated.bind(this),
                                              onDeleted:
this.onDeleted.bind(this),
                                    }}
                    />
                </Row>
            </Grid>
        );
    }
}

class DetailPagination extends React.Component{

    constructor(){

        super();
        this.state = {
            activePage: 1
        }
    }

    handleSelect(eventKey) {
        this.setState({
          activePage: eventKey
        });
    }

    render(){

        return(

            <   Pagination
                prev
                next
                first
                last
                ellipsis
                boundaryLinks
                items={5}
                maxButtons={5}
                activePage={this.state.activePage}
                onSelect={this.handleSelect.bind(this)}
            />
        );
    }
}

class DetailSearch extends React.Component{

    render(){

        let DetailSearchEN = (

            <Panel header="Search Detail">
              <form>
                <div className="form-group">
                    <div className="col-md-2 col-sm-2">
                      <label>Search:</label>
                    </div>
                    <div className="col-md-10 col-sm-10">
                      <input
onChange={this.props.detailCallback.onHandleChange.bind(this)}
type="text" className="form-control" id="first_name"
name="first_name"/>
                    </div>
                </div>
              </form>
            </Panel>
        )

        let DetailSearchES = (

            <Panel header="Busqueda ">
              <form>
                <div className="form-group">
                    <div className="col-md-2 col-sm-2">
                      <label>Buscar:</label>
                    </div>
                    <div className="col-md-10 col-sm-10">
                      <input
onChange={this.props.detailCallback.onHandleChange.bind(this)}
type="text" className="form-control" id="first_name"
name="first_name"/>
                    </div>
                </div>
              </form>
            </Panel>
        );

        let DetailSearchActive;

        if(languageActive){

            DetailSearchActive=DetailSearchEN
        }else{
            DetailSearchActive=DetailSearchES
        }

        return(
            <div>
                {DetailSearchActive}
            </div>
        );
    }
}

class DetailTable extends React.Component{

    render(){
        let filteredTable = this.props.detailData.filter(
            (detail) => detail.name.indexOf(this.props.filterText) !== -1
        )

        let DetailTableEN = (

            <Panel header="Search List">
              <Table striped bordered condensed hover>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Item</th>
                    <th>Environment</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                {filteredTable.map(
                    (detail,index) => <DetailTableBody
                                                    key={index}
                                                    id={detail.id}
                                                    name={detail.name}
                                                    item={detail.item}

environment={detail.environment}

detailCallback={this.props.detailCallback}
                                />
                )}
                </tbody>
              </Table>
              <div className="pull-right">
                <DetailPagination

                />
              </div>
            </Panel>
        );

        let DetailTableES = (

            <Panel header="Listado ">
              <Table striped bordered condensed hover>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Descripcion</th>
                    <th>Cantidad</th>
                    <th>Precio</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                {filteredTable.map(
                    (detail,index) => <DetailTableBody
                                                    key={index}
                                                    id={detail.id}
                                                    name={detail.name}
                                                    item={detail.item}

environment={detail.environment}

detailCallback={this.props.detailCallback}
                                />
                )}
                </tbody>
              </Table>
              <div className="pull-right">
                <DetailPagination

                />
              </div>
            </Panel>
        );

        let DetailTableActive;

        if(languageActive){
            DetailTableActive=DetailTableEN
        }else{
            DetailTableActive=DetailTableES
        }

        return(
            <div>
                {DetailTableActive}
            </div>
        );
    }
}

class DetailModalUpdate extends React.Component{

    constructor(){

        super();
        this.state = {

            parameter: '',
            showModal: true,
            detailData: [],
            name: ''
        }

    }

    close(){

        this.setState({

            showModal: false
        });

        //window.location.href = '/'
    }

    open(){

        this.setState({

            showModal: true
        });
    }

    componentDidMount(){

        fetch(API_URL+'/detail',{headers: API_HEADERS})
          .then((response)=>response.json())
          .then((responseData)=>{
              this.setState({

                  detailData: responseData
              })
          })
          .catch((error)=>{
              console.log('Error fetching and parsing data', error);
        })

        this.setState({

            parameter: this.props.params.detailid
        });

    }

    onSubmitted(event){

        event.preventDefault();

        let nextState = this.state.detailData;

        let index = nextState.findIndex(x=> x.id==this.state.parameter);

        let name = nextState[index].name;
        nextState[index].name=event.target.name.value
        if(event.target.name.value==''){
            event.target.name.value=name
        }

        let environment = nextState[index].environment;
        if(event.target.environment.value==''){
            event.target.environment.value=environment
        }

        fetch(API_URL+'/updatedetail', {

              method: 'post',
              headers: API_HEADERS,
              body:
JSON.stringify({"index":index,"name":event.target.name.value,"environment":event.target.environment.value})
        })

        this.setState({

            showModal: false
        });

    }

    render(){
        
        return(
        
            <Modal show={this.state.showModal} onHide={this.close.bind(this)}>
                <Modal.Header>
                    <Modal.Title>
                        <h1>Editing to {this.state.parameter}</h1>
                    </Modal.Title>
                </Modal.Header>
                <Form onSubmit={this.onSubmitted.bind(this)} horizontal>
                <Modal.Body>
                        <FormGroup controlId="formHorizontalId">
                          <Col componentClass={ControlLabel} sm={2}>
                            ID
                          </Col>
                          <Col sm={10}>
                            <FormControl value={this.state.parameter} type="id" placeholder="id" disabled />
                          </Col>
                        </FormGroup>
                        <FormGroup controlId="formHorizontalName">
                          <Col componentClass={ControlLabel} sm={2}>
                            Nombre
                          </Col>
                          <Col sm={10}>
                            <FormControl name="name" type="text" placeholder="Nombre" />
                          </Col>
                        </FormGroup>
                        <FormGroup controlId="formHorizontalEnvironment">
                          <Col componentClass={ControlLabel} sm={2}>
                            Cantidad
                          </Col>
                          <Col sm={10}>
                            <FormControl name="environment" type="text" placeholder="Cantidad" />
                          </Col>
                        </FormGroup>
                        <FormGroup controlId="formHorizontalEnvironment">
                          <Col componentClass={ControlLabel} sm={2}>
                            Precio
                          </Col>
                          <Col sm={10}>
                            <FormControl name="project" type="text" placeholder="Precio" />
                          </Col>
                        </FormGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button >Save</Button>
                </Modal.Footer>
                    </Form>
            </Modal>
        );
    }
}

class DetailTableBody extends React.Component{

    render(){

        return(

              <tr>
                <td>{this.props.id}</td>
                <td>{this.props.name}</td>
                <td>{this.props.item}</td>
                <td>{this.props.environment}</td>
                <td>
                    <Link className="btn btn-default"
to={'/updatedetail/'+this.props.id}><i className="fa fa-edit"
aria-hidden="true"></i></Link>
                    <Button
onClick={this.props.detailCallback.onDeleted.bind(this,this.props.id)}><i
className="fa fa-trash" aria-hidden="true"></i></Button>
                </td>
              </tr>

        );
    }
}

class DetailModal extends React.Component{

    render(){

        let DetailModalEN = (


                            <Modal show={this.props.showModal}
onHide={this.props.detailCallback.close}>
                              <Modal.Header closeButton>
                                <Modal.Title>Modal heading</Modal.Title>
                              </Modal.Header>
                              <Form horizontal
onSubmit={this.props.detailCallback.onsavedetail.bind(this)}>
                                  <Modal.Body>
                                            <FormGroup
controlId="formHorizontalid">
                                              <Col
componentClass={ControlLabel} sm={2}>
                                                ID
                                              </Col>
                                              <Col sm={10}>
                                                <FormControl
type="text" name="id" placeholder="ID" />
                                              </Col>
                                            </FormGroup>
                                            <FormGroup
controlId="formHorizontalname">
                                              <Col
componentClass={ControlLabel} sm={2}>
                                                Name
                                              </Col>
                                              <Col sm={10}>
                                                <FormControl
type="text" name="name" placeholder="Name" />
                                              </Col>
                                            </FormGroup>
                                            <FormGroup
controlId="formHorizontalEnvironment">
                                              <Col
componentClass={ControlLabel} sm={2}>
                                                Environment
                                              </Col>
                                              <Col sm={10}>
                                                <FormControl
type="text" name="environment" placeholder="Item" />
                                              </Col>
                                            </FormGroup>
                                            <FormGroup
controlId="formHorizontalItem">
                                              <Col
componentClass={ControlLabel} sm={2}>
                                                Item
                                              </Col>
                                              <Col sm={10}>
                                                <FormControl
type="text" name="item" placeholder="Item" />
                                              </Col>
                                            </FormGroup>
                                  </Modal.Body>
                                  <Modal.Footer>
                                        <Button type="submit"
pullRight>Save</Button>
                                  </Modal.Footer>
                              </Form>
                            </Modal>


        );
        let DetailModalES = (


                            <Modal show={this.props.showModal}
onHide={this.props.detailCallback.close}>
                              <Modal.Header closeButton>
                                <Modal.Title>Agregar Articulo</Modal.Title>
                              </Modal.Header>
                              <Form horizontal
onSubmit={this.props.detailCallback.onsavedetail.bind(this)}>
                                  <Modal.Body>
                                            <FormGroup
controlId="formHorizontalid">
                                              <Col
componentClass={ControlLabel} sm={2}>
                                                Codigo
                                              </Col>
                                              <Col sm={10}>
                                                <FormControl
type="text" name="id" placeholder="Codigo" />
                                              </Col>
                                            </FormGroup>
                                            <FormGroup
controlId="formHorizontalname">
                                              <Col
componentClass={ControlLabel} sm={2}>
                                                Descripcion
                                              </Col>
                                              <Col sm={10}>
                                                <FormControl
type="text" name="name" placeholder="Descripcion" />
                                              </Col>
                                            </FormGroup>
                                            <FormGroup
controlId="formHorizontalEnvironment">
                                              <Col
componentClass={ControlLabel} sm={2}>
                                                Precio
                                              </Col>
                                              <Col sm={10}>
                                                <FormControl
type="text" name="environment" placeholder="Precio" />
                                              </Col>
                                            </FormGroup>
                                            <FormGroup
controlId="formHorizontalItem">
                                              <Col
componentClass={ControlLabel} sm={2}>
                                                Cantidad
                                              </Col>
                                              <Col sm={10}>
                                                <FormControl
type="text" name="item" placeholder="Cantidad" />
                                              </Col>
                                            </FormGroup>
                                  </Modal.Body>
                                  <Modal.Footer>
                                        <Button type="submit"
pullRight>Save</Button>
                                  </Modal.Footer>
                              </Form>
                            </Modal>

        );

        let DetailModalActive;

        if(languageActive){
            DetailModalActive=DetailModalEN
        }else{
            DetailModalActive=DetailModalES
        }

        return(
            <div>
                {DetailModalActive}
            </div>

        );
    }
}

class Partials extends React.Component{

     constructor(){

          super();
          this.state = {

              masterAPI: [],
              searchData: '2017-10-06',
              total: 0
          }

    }

    componentDidMount(){

          fetch(API_URL+'/reporte',{headers: API_HEADERS})
          .then((response)=>response.json())
          .then((responseData)=>{
              this.setState({

                  masterAPI: responseData
              })
          })
          .catch((error)=>{
              console.log('Error fetching and parsing data', error);
          })

          let today = moment(new Date()).format('YYYY-MM-DD');

          this.setState({

              searchData: today
          });





    }

    onChanged(event){


        this.setState({

            searchData: event.target.value
        });

    }

    onRun(){

                let nextState = this.state.masterAPI.filter((master) => master.date == this.state.searchData);

                let grand = 0;

                for(var x=0;x<nextState.length;x++){
                    grand+=parseInt(nextState[x].project);
                }

                this.setState({

                    total: grand
                })



        window.print();
    }

    render(){

        let PartialsEN = (

            <h1>Draw List</h1>
        );

        let PartialsES = (

            <h1>Reporte Cuadre</h1>
        );

        let PartialsActive;

        if(languageActive){

            PartialsActive=PartialsEN
        }else{

            PartialsActive=PartialsES
        }

        return(

             <Grid>
                    <Row>
                        <Col xs={6}>
                            {PartialsActive}
                        </Col>
                    </Row>
                    <Row>
                        <PartialsSearch
                                        onChanged={this.onChanged.bind(this)}
                        />
                        <PartialsTable

                            masterAPI={this.state.masterAPI.filter((master)=> master.date == this.state.searchData)}
                            total={this.state.total}
                        />
                    </Row>
                    <Row>
                        <Button onClick={this.onRun.bind(this)}>i</Button>
                    </Row>
            </Grid>
        );
    }
}

class PartialsSearch extends React.Component{

    render(){

        return(



                    <Col xs={6}>
                        <Form horizontal
onChange={this.props.onChanged.bind(this)}>
                            <FormGroup controlId="formHorizontalEmail">
                              <Col componentClass={ControlLabel} xs={2}>

                              </Col>
                              <Col xs={6}>
                                <FormControl type="date" placeholder="Email" />
                              </Col>
                            </FormGroup>
                        </Form>
                    </Col>


        );
    }
}

class PartialsTable extends React.Component{



    render(){

        let partialsTableEN = (

            <tr>
                <th style={{'width':'15px', 'font-size':'25px',
'border-spacing':'0 30px'}}>#</th>
                <th style={{'width':'15px', 'font-size':'25px'}}>Date</th>
                <th style={{'width':'15px', 'font-size':'25px'}}>Name</th>
                <th style={{'width':'15px',
'font-size':'25px'}}>Project</th>
              </tr>
        );

        let partialsTableES = (

            <tr>
                <th style={{'width':'15px', 'font-size':'25px',
'border-spacing':'0 30px'}}>#</th>
                <th style={{'width':'15px', 'font-size':'25px'}}>Fecha</th>
                <th style={{'width':'15px', 'font-size':'25px'}}>Cliente</th>
                <th style={{'width':'15px',
'font-size':'25px'}}>Precio</th>
              </tr>
        );

        let partialsTableActive;

        if(languageActive){

           partialsTableActive=partialsTableEN
        }else{

           partialsTableActive=partialsTableES
        }

        return(


                    <Row>
                        <Col xs={12}>
                            <Table striped bordered condensed hover
style={{'width':'55%'}}>
                                <thead>
                                  {partialsTableActive}
                                </thead>
                                <tbody>
            {this.props.masterAPI.map(

                (master, index) => <PartialsTableBody
                                                key={index}
                                                index={index+1}
                                                id={master.id}
                                                date={master.date}
                                                name={master.name}
                                                project={master.project}
                                                total={this.props.total}
                                    />
            )}
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td>&nbsp;</td>
                                        <td>&nbsp;</td>
                                        <td style={{'width':'10px',
'font-size':'20px'}}>Total</td>
                                        <td style={{'width':'10px',
'font-size':'20px'}}>RD${this.props.total}.00</td>
                                        <br/>
                                        <br/>
                                    </tr>
                                </tfoot>
                            </Table>
                        </Col>
                    </Row>

        );
    }

}

class PartialsTableBody extends React.Component{

    render(){

            console.log(this.props.masterAPI)

        return(

              <tr>
                <td></td>
                <td style={{'font-size':'20px'}}>{this.props.date}</td>
                <td
style={{'font-size':'20px'}}>{this.props.name}</td>
                <td style={{'font-size':'20px'}}>{this.props.project}.00</td>
              </tr>
        );
    }
}

class TriPartials extends React.Component{

    constructor(){
        
        super();
        this.state = {
            
            masterAPI: []
        }
    }
    
    componentDidMount(){
        
        fetch(API_URL+'/weeklyreportrecap',{headers: API_HEADERS})
          .then((response)=>response.json())
          .then((responseData)=>{
              this.setState({

                  masterAPI: responseData
              })
          })
          .catch((error)=>{
              console.log('Error fetching and parsing data', error);
        })
    }
    
    render(){
        
        return(
        
            <TriPartialsTable
                                masterAPI={this.state.masterAPI}
            />
        );
    }
}

class TriPartialsTable extends React.Component{
    
    render(){
        
        return(
        
            <Table striped bordered condensed hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Nombre</th>
                    <th>Total</th>
                    <th>Porcentaje</th>
                    <th>Total + Porcentaje</th>
                  </tr>
                </thead>
                <tbody>
                    {this.props.masterAPI.map(
                         (master,index) => <TriPartialsTableBody
                                                        master={master._id}
                                                        total={master.total}
                                            />
                    )}                  
                </tbody>
              </Table>
        );
    }
}

class TriPartialsTableBody extends React.Component{

    constructor(){
        super();
        this.state = {
            percentage: 1
        }
    }

    onChanged(data){
        this.setState({
            percentage: data.target.value
        })
    }

    render(){

        let percentageTotal = this.props.total * this.state.percentage / 100;

        return(

            <tr>
                <td>&nbsp;</td>
                <td>{this.props.master}</td>
                <td>{this.props.total.toFixed(2)}</td>
                <td>
                    <input type="number" name="percentage" placeholder="%"  onChange={this.onChanged.bind(this)} />
                </td>
                <td>
                    <h6>{percentageTotal.toFixed(2)}</h6>
                </td>
            </tr>

        );
    }
}

class BiPartials extends React.Component{

     constructor(){

          super();
          this.state = {

              masterAPI: [],
          }

    }

    componentDidMount(){

          fetch(API_URL+'/weeklyreport',{headers: API_HEADERS})
          .then((response)=>response.json())
          .then((responseData)=>{
              this.setState({

                  masterAPI: responseData
              })
          })
          .catch((error)=>{
              console.log('Error fetching and parsing data', error);
          })

    }

    render(){
                
        return(
            <Table striped bordered condensed hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Fecha</th>
                    <th>Peluquera</th>
                  </tr>
                </thead>
                <tbody>
            {this.state.masterAPI.map(
                (master, index) => <BiPartialsTable
                                                index={index}
                                                fecha={master._id}
                                                count={master.count}
                            />
            )}
                </tbody>
              </Table>
        );
    }
}

class BiPartialsTable extends React.Component{
    
    render(){
        
        return(
                <tr>
                    <td>{this.props.index}</td>
                    <td>{this.props.fecha}</td>
                    <td>
                        <Table>     
                            
                                {this.props.count.map(
                                    (item) => <BiPartialsTableBody
                                                                        totales={item.totales}
                                                                        item={item.item}
                                              />
                                )}
                            
                        </Table>
                    </td>
                  </tr>
        );
    }
}

class BiPartialsTableBody extends React.Component{
    
    render(){
        
        return(
            <tr>
            <td>{this.props.item[0]}</td>
            <td>{this.props.totales}</td>
            </tr>
        );
    }
}

class AgregarPeluquera extends React.Component{

    constructor() {

        super();
        this.state = {
            showModal: false,
            filterText: '',
            peluqueraData: []
        }
    }

    componentDidMount(){

            fetch(API_URL+'/peluquera',{headers: API_HEADERS})
            .then((response)=>response.json())
            .then((responseData)=>{
                this.setState({

                    peluqueraData: responseData
                })

            })
            .catch((error)=>{
                console.log('Error fetching and parsing data', error);
            })

    }

    close() {
        this.setState({
            showModal: false
        });
    }

    open() {
        this.setState({
            showModal: true
        });
    }

    onDeleted(value){

        let nextState = this.state.peluqueraData;

        var index = nextState.findIndex(x=> x.id==value);
        console.log(nextState);
        console.log(value)
        nextState.splice(index,1);

        this.setState({

            peluqueraData: nextState
        });

        fetch(API_URL+'/deletepeluquera', {

              method: 'post',
              headers: API_HEADERS,
              body: JSON.stringify({"index":index,"id":value})
        })
    }

    onSavePeluquera(event){

        event.preventDefault();

        let today = moment(new Date()).format('YYYY-MM-DD');

        let newPeluquera = {

            "id": Date.now(),
            "date": today,
            "name": event.target.name.value,
        }

        let nextState = this.state.peluqueraData;

        nextState.push(newPeluquera);

        fetch(API_URL+'/peluquera', {

                 method: 'post',
                headers: API_HEADERS,
                body: JSON.stringify(newPeluquera)
        })

        this.setState({

            peluqueraData: nextState,
            showModal: false
        });

    }

    onHandleChange(event){

        this.setState({

            filterText: event.target.value
        });
    }

    
    render(){   
        return(
                <Grid>
                <Row>
                    <PeluqueraSearch/>
                </Row>
            <Row>
            <div className="pull-right">
                <Button onClick={this.open.bind(this)}>Agregar Peluquera</Button>
                <PeluqueraModal showModal={this.state.showModal}
                                            peluqueraCallback={{
                                                open:this.open,
                                                close:this.close.bind(this), 
                                                onsavepeluquera:this.onSavePeluquera.bind(this),
                                                ondeletepeluquera:this.onDeleted.bind(this)
                                            }}
                            />

            </div>
            </Row>
            <br/>
            <Row>
                <PeluqueraTable
                                    filterText={this.state.filterText}
                                    peluqueraData={this.state.peluqueraData}     
                                    peluqueraCallback={{
                                        onDeleted: this.onDeleted.bind(this)
                                    }}                                               
                />
            </Row>
            </Grid>
        );
    }
}
class PeluqueraSearch extends React.Component{
    render(){
        return(
            <Panel header="Busqueda ">
                <form>
                <div className="form-group">
                    <div className="col-md-2 col-sm-2">
                        <label>Buscar:</label>
                    </div>
                    <div className="col-md-10 col-sm-10">
                        <input type="text" className="form-control" id="first_name" name="first_name"/>
                    </div>
                </div>
                </form>
            </Panel>
        );
    }
}
class PeluqueraTable extends React.Component{
    render(){

        let filteredMaster = this.props.peluqueraData.filter(

            (master) => master.name.indexOf(this.props.filterText) !== -1
        );

        return(
            <Panel header="Listado de peluquera">
                <Table striped bordered condensed hover>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Fecha</th>
                        <th>Nombre</th>
                        <th>Acciones</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredMaster.map(
                            (master, index) => <PeluqueraTableBody
                                                                    id={master.id}                                                                    date={master.date}
                                                                    date={master.date}
                                                                    name={master.name}
                                                                    peluqueraCallback={this.props.peluqueraCallback}
                                                />
                    )}
                    </tbody>
                </Table>
            </Panel>
        );
    }
}

class PeluqueraTableBody extends React.Component{
    render(){
        return(
            <tr>
                <td>{this.props.id}</td>
                <td>{this.props.date}</td>
                <td>{this.props.name}</td>
                <td>
                    <Button className="btn btn-default"><i className="fa fa-edit" aria-hidden="true"></i></Button>
                    <Button onClick={this.props.peluqueraCallback.onDeleted.bind(this,this.props.id)}><i className="fa fa-trash" aria-hidden="true"></i></Button>
                </td>

            </tr>
        );
    }
}


class PeluqueraModal extends React.Component{

    render(){
        return(
            <Modal show={this.props.showModal} onHide={this.props.peluqueraCallback.close}>
            <Modal.Header closeButton>
              <Modal.Title>Agregar Peluquera</Modal.Title>
            </Modal.Header>
            <Form horizontal onSubmit={this.props.peluqueraCallback.onsavepeluquera.bind(this)}>
                <Modal.Body>
                          <FormGroup controlId="formHorizontalname">
                            <Col componentClass={ControlLabel} sm={2}>
                              Nombre
                            </Col>
                            <Col sm={10}>
                              <FormControl type="text" name="name" placeholder="Nombre" />
                            </Col>
                          </FormGroup>
                </Modal.Body>
                <Modal.Footer>
                      <Button type="submit" pullRight>Save</Button>
                </Modal.Footer>
            </Form>
          </Modal>

        );
    }
}

class Registration extends React.Component{

    render(){
        return(
            <div className="container">
                <div className="row vertical-offset-100">
                    <div className="col-md-4 col-md-offset-4">
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <h3 className="panel-title">Please sign up</h3>
                            </div>
                            <div className="panel-body">
                                <form onSubmit={this.props.setregistration.bind(this)}>
                                <fieldset>
                                    <div className="form-group">
                                        <input className="form-control" placeholder="E-mail" name="email" type="text"/>
                                    </div>
                                    <div className="form-group">
                                        <input className="form-control" placeholder="Password" name="password" type="password"/>
                                    </div>                                    
                                    <button className="btn btn-lg btn-success btn-block">Save</button>
                                </fieldset>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }

}

class Account extends React.Component{

    constructor(){

        super();
        this.state = {
  
            password: ""
        }
    }

    onSubmit(event){

        event.preventDefault();

        let newPassword = {
            "token": token(),
            "newpassword":this.state.password
        }
        console.log(newPassword)

        fetch(API_URL+'/resetpassword', {

            method: 'post',
            headers: API_HEADERS,
            body: JSON.stringify(newPassword)
        })

        //window.location.reload();
    }
  

    onhandleuserinput(event){
        this.setState({
            password: event.target.value
        })
    }
    render(){
        return(
            <Panel header="Reset Password">
                  <form onSubmit={this.onSubmit.bind(this)}>
                    <div className="form-group">
                        <div className="col-md-2 col-sm-2">
                          <label>Password:</label>
                        </div>
                        <div className="col-md-10 col-sm-10">
                          <input onChange={this.onhandleuserinput.bind(this)} type="password" className="form-control" id="first_name" name="first_name"/>
                          <br/>
                          <button className="btn btn-lg btn-success btn-block">Reset</button>
                        </div>
                    </div>
                  </form>
                </Panel>

        );
    }
}


ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
        <Route path="account" component={Account}/>
        <Route path="agregar_peluquera" component={AgregarPeluquera}/>
        <Route path="tripartials" component={TriPartials}/>
    	<Route path="bipartials" component={BiPartials}/>
        <Route path="partials" component={Partials}/>
        <Route path="about" component={About}/>
        <Route path="repos/:repo_name" component={Repos}/>
        <Route path="updatedetail/:detailid" component={DetailModalUpdate}/>
        <Route path="actions/:actionid" component={Actions}/>
        <Route path="detail" component={Detail}/>
        <Route path="master" component={Master}/>
    </Route>
  </Router>
), document.getElementById('contents'));
