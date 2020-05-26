let tabSearchUsersFound = null;
let searchInput = null;
let userSearchInput = '';
let submitButton = null;
let loading = null;

let qtdFound = null;
let tittleStatistics = null;

let resultAge = null;
let resultAgeAverage = null;
let genderManResult = null;
let genderWomanResult = null;
let genderMen = null;
let genderWomen = null;

let allUsers = [];
let usersFound = [];

window.onload = () => {
  tabSearchUsersFound = document.querySelector('#tabSearchUsersFound');
  searchInput = document.querySelector('#searchInput');
  tittleStatistics = document.querySelector('#tittleStatistics');
  submitButton = document.querySelector('#submitButton');
  loading = document.querySelector('#loading');

  qtdFound = document.querySelector('#qtdFound');
  countResultUsers = document.querySelector('#countResultUsers');

  resultAge = document.querySelector('#resultAge');
  resultAgeAverage = document.querySelector('#resultAgeAverage');
  genderManResult = document.querySelector('#genderManResult');
  genderWomanResult = document.querySelector('#genderWomanResult');
  genderMen = document.querySelector('#genderMen');
  genderWomen = document.querySelector('#genderWomen');

  numberFormat = Intl.NumberFormat('pt-BR');

  submitButton.disabled = true;

  let ponto = '❱';
  const interval = setInterval(() => {
    loading.innerHTML = `<h5>Carregando${ponto}</h5>`;
    ponto += '❱';

    if (ponto === '❱❱❱❱❱❱') {
      loading.textContent = '';
      this.clearInterval(interval);
    }
  }, 1000);

  fetchUsers();
  resultSearchUsers();
  resetSearchArray();
  buttonSubmit();
};

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
    console.log(event);
  }
  let form = document.querySelector('#searchInput');
  form.addEventListener('submit', handleFormSubmit);
}

const resultSearchUsers = () => {
  function handleSearch(event) {
    submitButton.disabled = false;
    if (event.key === 'Enter' && searchInput.value !== '') {
      userSearchInput = event.target.value;

      for (i = 0; i < allUsers.length; i++) {
        let name = allUsers[i].name;

        if (name.toUpperCase().indexOf(userSearchInput.toUpperCase()) > -1) {
          usersFound = [...usersFound, allUsers[i]];
        }
      }
      render();
    } else if (searchInput.value === '') {
      submitButton.disabled = true;
    }
    //Limpando Variável da Busca após o resultado
    resetSearchArray();
  }
  searchInput.addEventListener('keyup', handleSearch);
};

const buttonSubmit = () => {
  function handleButton(event) {
    userSearchInput = searchInput.value;

    for (i = 0; i < allUsers.length; i++) {
      let name = allUsers[i].name;

      if (name.toUpperCase().indexOf(userSearchInput.toUpperCase()) > -1) {
        usersFound = [...usersFound, allUsers[i]];
      }
    }
    render();
  }
  //Limpando Variável da Busca após o resultado
  resetSearchArray();
  submitButton.addEventListener('click', handleButton);
};
const render = () => {
  SearchResult();
  resultStatistics();
};

const SearchResult = () => {
  let usersHTML = '';
  if (usersFound.length > 0) {
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

const resultStatistics = () => {
  if (usersFound.length > 0) {
    const sumAge = usersFound.reduce((acc, curr) => {
      return acc + curr.dob;
    }, 0);

    const men = usersFound.filter((user) => {
      return user.gender === 'male';
    });

    const women = usersFound.filter((user) => {
      return user.gender === 'female';
    });

    let totalResult = usersFound.length;

    tittleStatistics.textContent = 'Estatísticas';
    genderMen.innerHTML = `Sexo masculino: <span id="genderManResult">${men.length}</span>`;
    genderWomen.innerHTML = `Sexo Feminino: <span id="genderManResult">${women.length}</span>`;
    SumAges.innerHTML = `Soma das idades: <span>${sumAge}</span>`;
    averageAges.innerHTML = `Soma das idades: <span>${formatNumber(
      sumAge / totalResult
    )}
    </span>`;
    qtdFound.innerHTML = `${totalResult} Usuário(s) Encontrado(s)`;
  } else {
    tittleStatistics.textContent = 'Nada a ser exibido';
    genderMen.textContent = '';
    genderWomen.textContent = '';
    SumAges.textContent = '';
    averageAges.textContent = '';
    qtdFound.textContent = 'Nenhum usuário filtrado';
  }
};

const resetSearchArray = () => {
  usersFound = [];
};

const formatNumber = (number) => {
  return numberFormat.format(number);
};
