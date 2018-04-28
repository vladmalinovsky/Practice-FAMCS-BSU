    var filterConfig={
        author:"Mr. Snow",
        firstDate: new Date('2017-02-23T15:04:37'),
        lastDate:new Date('2018-03-04T00:00:00'),
        hashTags:['#great','#grand']
    };
   
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
        if(/*typeof skip!=="number"||typeof top!=="number"||*/skip<0||top<0) return "Incorrect parametrs";
		let photoPosts=this;
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
        var flag=false;
		let photoPosts=this;
        if(typeof id!=="string"||id<1)
            return "Incorrect data!";
        for(var i=0;i<photoPosts.length;i++)
            if(photoPosts[i].id===id){flag=true;return photoPosts[i];}
        if(flag===false) return "Incorrect data!";
    };

    let removePhotoPost=function(id){
		let photoPosts=this;
        if(typeof id!=="string"||id<1)
            return "Incorrect data";
        for(var i=0;i<photoPosts.length;i++)
            if(photoPosts[i].id===id) photoPosts.splice(i,1);
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
        if(!validatePhotoPost(photopost)) return false;
        this.push(photopost);
        return true;
    };

    let editPhotoPost=function(id,photoPost){
		let photoPosts=this;
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

        for (var i = 0; i < photoPosts.length; i++){
            if(photoPosts[i].id===id){
                if(photoPost.descriprion) photoPosts[i].descriprion=photoPost.descriprion;
                if(photoPost.photoLink) photoPosts[i].photoLink=photoPost.photoLink;
                if(Array.isArray(photoPost.hashTags)) photoPosts[i].hashTags=photoPost.hashTags;
                return true;
            }
        }
    };
        return {
            getPhotoPost,getPhotoPosts,addPhotoPost,editPhotoPost,removePhotoPost,validatePhotoPost
        }

    })();
    module.exports = modul;