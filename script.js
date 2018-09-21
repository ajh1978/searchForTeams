'use strict';

const searchBtn = document.getElementById("searchBtn");
let teamContainer = document.getElementById('teamContainer');

searchBtn.onclick = function(){

  // empty the html before new search
  while (teamContainer.lastChild) {
    teamContainer.removeChild(teamContainer.lastChild);
  }

  let teamName = document.getElementById("teamName").value;
  let apiKey = 1;
  const Url = `https://www.thesportsdb.com/api/v1/json/${apiKey}/searchteams.php?t=%25${teamName}%`;

  fetch(Url).then(response => {
    return response.json();
  }).then(data => {
    // console.log(data);
    printTeams(data);
  }).catch(err => {
    // Do something for an error here
    console.log('Error!!!');
  });

};

function printTeams(data) {

  const joukkueet = data.teams;

  for (let i = 0; i < joukkueet.length; i++){

    let teamDiv = document.createElement('div');
    teamDiv.id = 'team_' + i;
    teamDiv.className = 'teamDiv';

    teamContainer.appendChild(teamDiv);

    let logo = document.createElement('img');
    logo.className = 'logo';

    let logoText = document.createElement('p');
    logoText.className = 'logoText';
    logo.appendChild(logoText);

    let name = document.createElement('p');
    name.className = 'name';

    let webSite = document.createElement('a');
    webSite.className = 'webSite';

    teamDiv.append(logo, name, webSite);

    let teamLogo = joukkueet[i].strTeamBadge;
    let teamName = joukkueet[i].strTeam;
    let webPage = joukkueet[i].strWebsite;

    if(teamLogo === undefined || teamLogo === null || teamLogo === '') {
      logoText.textContent = '(No image available)';
    }
    else {
      logo.src = teamLogo;
    }
    if(teamName === undefined){teamName = '';}
    if(webPage === undefined){webPage = '';}

    name.textContent = teamName;
    webSite.textContent = 'website';
    webSite.href = `http://${webPage}`;
    webSite.target = "_blank";
  }
}
