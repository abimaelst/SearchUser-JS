let tabSearchUsersFound = null;
let searchInput = null;
let userSearchInput = '';

let allUsers = [];
let usersFound = [];

window.addEventListener('load', () => {
  tabSearchUsersFound = document.querySelector('#tabSearchUsersFound');
  searchInput = document.querySelector('#searchInput');
  fetchUsers();
  resultSearchUsers();
});

const fetchUsers = async () => {
  const res = await fetch(
    'https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo'
  );
  const json = await res.json();

  allUsers = json.results.map((user) => {
    const { name, picture, dob, login, gender } = user;
    return {
      login: login.username,
      name: name.first + ' ' + name.last,
      dob: dob.age,
      picture: picture.thumbnail,
      gender,
    };
  });
};

function preventFormSubmit() {
  function handleFormSubmit(event) {
    event.preventDefault();
  }
  let form = document.querySelector('#searchInput');
  form.addEventListener('submit', handleFormSubmit);
}

const resultSearchUsers = () => {
  function handleSearch(event) {
    if (event.key === 'Enter') {
      userSearchInput = event.target.value;

      for (i = 0; i < 10; i++) {
        let name = allUsers[i].name;

        if (name.toUpperCase().indexOf(userSearchInput.toUpperCase()) > -1) {
          usersFound = [...usersFound, allUsers[i]];
        }
      }
      render();
    }
    //Limpando Variável da Busca após o resultado
    usersFound = [];
  }
  searchInput.addEventListener('keyup', handleSearch);
};

const render = () => {
  renderSearchResult();
};

const renderSearchResult = () => {
  let usersHTML = '';
  if (usersFound.length === 0) {
    console.log('aqui');
    usersHTML = '<h2>Nenhum Usuário Encontrado</h2>';
  } else {
    usersHTML = '<div>';

    usersFound.forEach((user) => {
      const { name, dob, picture, login } = user;
      const userHTML = `
      <div class='users'>
        <div>
          <img src='${picture}' name='${name}' />
        </div>
        <div>
          ${name},
        </div>
        <div>
          <p>${dob} Anos </p>
        </div>
      </div>
    `;
      usersHTML += userHTML;
    });

    usersHTML += '</div>';
  }
  tabSearchUsersFound.innerHTML = usersHTML;
};
