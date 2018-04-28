document.querySelector('.authorization').style.display = 'none';
document.querySelector('.edit-posts').style.display = 'none';
document.querySelector('.error').style.display = '';
function auth(event) {
    document.querySelector('.authorization').style.display = '';
}

var currentFilter;
var k=10;
function showMoreArticles() {
    document.querySelector('.tape').innerHTML = '';
    dom.displayPhotoPosts(k,10,currentFilter);
    k=k+10;
}

function filterNews() {
    var dateFrom = document.getElementById('date-filter-from');
    dateFrom = new Date(dateFrom.value);
    var dateTo = document.getElementById('date-filter-to');
    dateTo = new Date(dateTo.value);

    document.querySelector('main').innerHTML='';

    var author = document.getElementById('filter');
    if (author.value)
        author = author.value;
    else author = undefined;

    var hashTags = document.getElementById('hash');
    if(hashTags.value)
        hashTags=hashTags.value.split(' ');
    else hashTags=undefined;


    if (!currentFilter) {
        currentFilter = {};
    }

    if (dateFrom == 'Invalid Date')
        dateFrom = undefined;
    else dateFrom.setHours(0);
    if (dateTo == 'Invalid Date')
        dateTo = undefined;
    else dateTo.setHours(23);

    currentFilter.firstDate = dateFrom;
    currentFilter.lastDate = dateTo;
    currentFilter.author = author;
    currentFilter.hashTags = hashTags;
    dom.displayPhotoPosts(0,10,currentFilter);
}

function logIn() {
    localStorage.removeItem("user");
    var name = document.getElementById("autinput").value;
    var password = document.getElementById("autinput1").value;
    dom.getuser(name);
    document.querySelector('.authorization').style.display = 'none';
}

function addPost() {
    var form = document.forms.create;
    var photoPost = {
        id:'' + new Date().getTime(),
        descriprion:form.descriprion.value,
        createdAt: new Date(),
        author: user,
        photoLink: form.photoLink.value,
        hashTags: form.hashTags.value.split(' '),
        likes:['lol']
    };
    dom.addPhotoPost(photoPost);
}

function removefp(current) {
    const id = current.id;
    dom.removePhotoPost(id).then(() => {
        dom.displayPhotoPosts();
    });
    }

    var num;
 function edit(current){

    num=current.id;
     document.querySelector('main').style.display = 'none';
     document.querySelector('.add-posts').style.display = 'none';
     document.querySelector('.edit-posts').style.display = '';
     document.querySelector('.error').style.display = 'none';
     document.querySelector('.b-popup-author').style.display = 'none';
     document.querySelector('.b-popup-date').style.display = 'none';
     document.querySelector('.b-popup-hashtags').style.display = 'none';

     }

function editclick(){
    var form1 = document.forms.createl;
    var photoPost = {
        descriprion: form1.descriprion.value,
        photoLink: form1.photoLink.value,
        hashTags: form1.hashTags.value.split(' ')
    }
    dom.editPhotoPost(num,photoPost);

    document.querySelector('main').style.display = '';
    dom.empty();
    dom.displayPhotoPosts(0,10,currentFilter);
    document.querySelector('.add-posts').style.display = '';
    document.querySelector('.edit-posts').style.display = 'none';
    document.querySelector('.error').style.display = 'none';
    document.querySelector('.b-popup-author').style.display = '';
    document.querySelector('.b-popup-date').style.display = '';
    document.querySelector('.b-popup-hashtags').style.display = '';
   }

   function like(current){

   }
