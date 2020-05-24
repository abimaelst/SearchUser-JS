let tabSearchUsersFound = null;

let allUsers = null;

window.addEventListener('load', () => {
  tabSearchUsersFound = document.querySelector('#tabSearchUsersFound');
  fetchUsers();
});

const fetchUsers = async () => {
  const res = await fetch(
    'https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo'
  );
  const json = await res.json();
  allUsers = json.results.map((user) => {
    const { name, picture, dob, login } = user;
    return {
      login: login.username,
      name: name.first + ' ' + name.last,
      dob: dob.age,
      picture: picture.thumbnail,
    };
  });
  render();
};

const render = () => {
  renderSearchResult();
};

const renderSearchResult = () => {
  let usersHTML = '<div>';

  allUsers.forEach((user) => {
    const { name, dob, picture, login } = user;
    const space = ' ';
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

  tabSearchUsersFound.innerHTML = usersHTML;
};
