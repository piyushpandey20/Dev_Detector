const url = "https://api.github.com/users/";

const noresult = document.querySelector(".noresult");
const SearchText = document.querySelector(".SearchText");
const Search = document.querySelector(".Search");

Search.addEventListener("click",()=>{
    if(SearchText.value!=" "){
        getdata(url + SearchText.value);
        console.log(SearchText.value);
    }
})

SearchText.addEventListener("keydown",(e)=>{
    if(e.key === "Enter"){
        if(SearchText.value!=" "){
            getdata(url + SearchText.value);
            console.log(SearchText.value);
        }
    }
})

async function getdata(giturl){
    const response = await fetch(giturl);
    const data = await response.json();
    updateProfile(data);
}

function updateProfile(data){
    noresult.style.scale = 0;
    if(data.message !== "Not Found"){
        const userimage = document.querySelector("#userimage");
        const name =document.querySelector(".name");
        const userid = document.querySelector("#userid");
        const date = document.querySelector(".date");
        const bio = document.querySelector(".bio");
        const repos = document.querySelector("#repos");
        const Followers = document.querySelector("#Followers");
        const Following = document.querySelector("#Following");
        const location = document.querySelector(".location");
        const site = document.querySelector(".site");
        const twitter = document.querySelector(".twitter");
        const company = document.querySelector(".company");


        userimage.src = `${data.avatar_url}`;
        name.innerText = data?.name;
        userid.innerText = `@${data?.login}`;
        userid.href = data?.html_url;
        //date
        bio.innerText = (data?.bio === null)?"Kuch nhi hai":data?.bio;
        repos.innerText = data?.public_repos;
        repos.href = data?.repos_url;
        Followers.innerText = data?.followers;
        Followers.href = data?.followers_url;
        Following.innerText = data?.following;
        Following.href = data?.following_url;
        location.innerText = (data?.location === null)?"Kuch nhi hai":data?.location;
        twitter.innerText = (data?.twitter_username === null)?"Kuch nhi hai":data?.twitter_username;
        twitter.href = (data?.twitter_username !== null)?`https://twitter.com/${data?.twitter_username}` : "#";
        site.innerText = (data?.blog === "")?"Kuch nhi hai":data?.blog;
        site.href = (data?.blog !== "")?`https://twitter.com/${data?.blog}` : "#";
        company.innerText = (data?.company === null)?"Kuch nhi hai":data?.company;
    }
    else{
        noresult.style.scale = 1;
        setTimeout(() => {
            noresult.style.scale = 0;
        }, 2500);
    }
}