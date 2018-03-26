    var filterConfig={
        author:"Mr. Snow",
        firstDate: new Date('1970-01-01T12:00:00'),
        lastDate: new Date(),
        hashTags:['#great','#grand']
    };

   var photoPosts = [
        {
            id: '1',
            descriprion: 'Great win!',
            createdAt: new Date('2018-02-23T19:36:00'),
            author: 'Mr. Snow',
            photoLink: 'https://www.thenational.ae/image/policy:1.712134:1520772005/Champions-League-Round-of-16-First-Leg-Chelsea-vs-FC-Barcelona.JPG?f=16x9&w=1200&$p$f$w=9690992',
            hashTags:['#great','#grand'],
            likes:['sdsdf','abraham']
        },
        {
            id: '2',
            descriprion: 'Power of forests',
            createdAt: new Date('2018-02-23T21:34:00'),
            author: 'john_millman',
            photoLink: 'https://upload.wikimedia.org/wikipedia/commons/a/a3/Nature-View.jpg',
            hashTags:['#forest','#power'],
            likes:['sdsdf','abraham','vlad','chelsea']
        },
        {
            id: '3',
            descriprion: 'Walking down the park',
            createdAt: new Date('2017-02-23T15:24:37'),
            author: 'craig',
            photoLink: 'https://wallpapertag.com/wallpaper/full/6/3/5/859835-nature-wallpaper-for-desktop-1920x1080-for-android-50.jpg',
            hashTags:['#park','#grand'],
            likes:['sdsdf']
        },
        {
            id: '4',
            descriprion: 'Great champions!',
            createdAt: new Date('2015-10-25T14:59:21'),
            author: 'tennisTV',
            photoLink: 'https://statics.sportskeeda.com/wp-content/uploads/2015/11/495279516-1446442095-800.jpg',
            hashTags:['#champion','#8title','#nadal','#federer'],
            likes:['nadal','federer']
        },
        {
            id: '5',
            descriprion: 'Chelsea goes for cup',
            createdAt: new Date('2012-05-23T22:11:10'),
            author: 'chelsea',
            photoLink: 'http://static.goal.com/187100/187181.jpg',
            hashTags:['#uefa'],
            likes:['sdsdf','abraham','brad','petr']
        },
        {
            id: '6',
            descriprion: 'Atlantic ocean',
            createdAt: new Date('2016-01-03T09:15:00'),
            author: 'Mr. Snow',
            photoLink: 'https://static.pexels.com/photos/103567/pexels-photo-103567.jpeg',
            hashTags:['#great','#water','#ocean'],
            likes:['sdsdf','abraham']
        },
        {
            id: '7',
            descriprion: 'My new Audi)',
            createdAt: new Date('2015-07-06T07:29:03'),
            author: 'John Cena',
            photoLink: 'http://topgears.com.ua/wp-content/uploads/2017/12/foto-2.jpg',
            hashTags:['#audi','#car'],
            likes:['cenafan']
        },
        {
            id: '8',
            descriprion: 'Rainy day',
            createdAt: new Date('2018-03-02T13:27:01'),
            author: 'Mr. Snow',
            photoLink: 'https://media.blogto.com/articles/20170519-rainyday.jpg?cmd=resize_then_crop&quality=70&w=2048&height=1365',
            hashTags:['#rain'],
            likes:['sdsdf','abraham']
        },
        {
            id: '9',
            descriprion: 'New 521 room in BSU',
            createdAt: new Date('2037-07-03T10:14:00'),
            author: 'Levakov',
            photoLink: 'https://media.beam.usnews.com/23/da/d14d7d6e45238894bcfc41eed197/160624-university-of-michigan-submitted.jpg',
            hashTags:['#dozdalis','#nakonecto'],
            likes:['Levakov','Vlad','famcs_bsu']
        },
        {
            id: '10',
            descriprion: 'When you have 10 for task 4',
            createdAt: new Date('2018-03-06T20:11:00'),
            author: 'Vlad',
            photoLink: 'http://images.cdn.starpulse.com/news/bloggers/1279398/blog_images/leonardo-dicaprio-jordan-belfort-quotes-wolf-of-wall-street.jpg',
            hashTags:['#happy'],
            likes:['Vlad']
        },
        {
            id: '11',
            descriprion: 'When you have 7 for task 3',
            createdAt: new Date('2018-02-26T19:11:00'),
            author: 'Vlad',
            photoLink: 'http://media.hollywood.com/images/638x425/1927878.JPG',
            hashTags:['#bigupset'],
            likes:['Vlad']
        },
        {
            id: '12',
            descriprion: 'Beauty of winter Olympics',
            createdAt: new Date('2010-02-13T14:52:00'),
            author: 'asdf',
            photoLink: 'http://cdn.lightgalleries.net/4bd5ec148405e/images/Vancouver_olympics-14-2.jpg',
            hashTags:['#olympics','#winter'],
            likes:['Vlad','canada_olympics','belarus_ice_hockey']
        },

    ];
      //localStorage.setItem('photoPosts', JSON.stringify(photoPosts));


    let modul=(function() {

    function filterDate(a,b){
        return (a.createdAt-b.createdAt);
    }

    function containsAny(source,target)
    {
        var result = source.filter(function(item){ return target.indexOf(item) > -1});
        if(result.length > 0) return true;
    }

    let getPhotoPosts=function(skip=0,top=10,filterConfig) {
        var gg=JSON.parse(localStorage.getItem('photoPosts'));
        for(var i=0;i<gg.length;i++){
            gg[i].createdAt=new Date(gg[i].createdAt)
        }
        for(var i=0;i<gg.length;i++){
            gg[i].author=gg[i].author.trim();
        }
        var photoPosts=gg;

        if(typeof skip!=="number"||typeof top!=="number"||skip<0||top<0) return "Incorrect parametrs";
        photoPosts=(photoPosts.sort(filterDate)).reverse();
        var copy=photoPosts;
        if(filterConfig!==undefined&&typeof filterConfig==="object"){
            if(filterConfig.author){
                copy = copy.filter(d => {var auth = d.author;
                return (filterConfig.author === auth);
            })
            }

            if(Array.isArray(filterConfig.hashTags)){
                copy = copy.filter(d => {var hash = d.hashTags;
                return containsAny(filterConfig.hashTags, hash);
            })
            }

            if(filterConfig.firstDate instanceof Date){
                copy = copy.filter(d => {var time = new Date(d.createdAt).getTime();
                return (filterConfig.firstDate < time);
            })
            }
            if(filterConfig.lastDate instanceof Date){
                copy = copy.filter(d => {var time = new Date(d.createdAt).getTime();
                return (filterConfig.lastDate > time);
            })
            }
            return copy.slice(skip,top+skip);
        }
        return photoPosts.slice(skip,top+skip);
    };

    let getPhotoPost=function(id){
        var gg=JSON.parse(localStorage.getItem('photoPosts'));
        for(var i=0;i<gg.length;i++){
            gg[i].createdAt=new Date(gg[i].createdAt)
        }
        var flag=false;
        if(typeof id!=="string"||id<1)
            return "Incorrect data!";
        for(var i=0;i<gg.length;i++)
            if(gg[i].id===id){flag=true; localStorage.setItem('photoPosts', JSON.stringify(gg));return gg[i];}
        if(flag===false) return "Incorrect data!";
    };

    let removePhotoPost=function(id){
            var gg=JSON.parse(localStorage.getItem('photoPosts'));
            if(typeof id!=="string"||id<1)
            return "Incorrect data";
        for(var i=0;i<gg.length;i++)
            if(gg[i].id===id){ gg.splice(i,1);}
        localStorage.setItem('photoPosts', JSON.stringify(gg));
        return true;
    };

    let validatePhotoPost=function(photopost){
        if(typeof photopost!=="object"){
            console.log("Incorrect type of parametr!");
            return false;
        }
        if(typeof photopost.id!=="string"||photopost.id=="") return false;
        if(typeof photopost.descriprion!=="string"||photopost.descriprion==""||photopost.descriprion.length>=200) return false;
        if(!(photopost.createdAt instanceof Date)) return false;
        if(typeof photopost.author!=="string"||photopost.author=="")return false;
        if(typeof photopost.photoLink!=="string"||photopost.photoLink=="") return false;
        if(!Array.isArray(photopost.hashTags)) return false;
        if(!Array.isArray(photopost.likes)) return false;
        return true;
    };
    let addPhotoPost=function(photopost)
    {
        var gg=JSON.parse(localStorage.getItem('photoPosts'));
        if(!validatePhotoPost(photopost)) return false;
        photoPosts.push(photopost);
        gg.push(photopost);
        localStorage.setItem('photoPosts', JSON.stringify(gg));
        return true;
    };

    let editPhotoPost=function(id,photoPost){
        var gg=JSON.parse(localStorage.getItem('photoPosts'));
        if (typeof id !== "string" || id === "" || typeof photoPost !== "object") {
            return false;
        }
        if(photoPost.descriprion)
            if(typeof photoPost.descriprion!=="string")
                return false;
        if(photoPost.photoLink)
            if(typeof photoPost.photoLink!=="string")
                return false;

        if(photoPost.hashTags)
            if(!(Array.isArray(photoPost.hashTags)))
                return false;

        for (var i = 0; i < gg.length; i++){
            if(gg[i].id===id){
                if(photoPost.descriprion&&photoPost.descriprion!=="") gg[i].descriprion=photoPost.descriprion;
                if(photoPost.photoLink) gg[i].photoLink=photoPost.photoLink;
                if(Array.isArray(photoPost.hashTags))gg[i].hashTags=photoPost.hashTags;
                localStorage.setItem('photoPosts', JSON.stringify(gg));
                return true;
            }
        }
    };
        return {
            getPhotoPost,getPhotoPosts,addPhotoPost,editPhotoPost,removePhotoPost,validatePhotoPost
        }

    })();


