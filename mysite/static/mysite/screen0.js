/**
 *
 * 获取当前时间
 */
function p(s) {
    return s < 10 ? '0' + s: s;
}

var myDate = new Date();
//获取当前年
var year=myDate.getFullYear();
//获取当前月
var month=myDate.getMonth()+1;
//获取当前日
var date=myDate.getDate();
var h=myDate.getHours();       //获取当前小时数(0-23)
var m=myDate.getMinutes();     //获取当前分钟数(0-59)
var s=myDate.getSeconds();

// var now=year+'-'+p(month)+"-"+p(date)+" "+p(h)+':'+p(m)+":"+p(s);
var now=year+'-'+p(month)+"-"+p(date);



//第一个页面应用
var app = new  Vue({
    el: '#app',
    data:{
        message: 'This is screen0!',
        camera_list: [
            {"camera": "xxx"},
            ],
        date: now,
        camera: '',
        videos: [],

    },
    beforeCreate:function () {
        localStorage.clear();
    },
    created:function () {
        this.get_camera();
        window.addEventListener("storage", function (e) {
            if(e.key == 'status')
            {
                console.log("GGGgG");
            }
        });
    },
    beforeMount:function(){
        // this.get_camera();

    },
    mount:function () {
        // this.get_camera();
        window.addEventListener("storage", function (e) {
            if(e.key == 'status')
            {
                console.log("GGGgG");
            }
        });
    },
    update:function () {
        // this.get_camera();
        window.addEventListener("storage", function (e) {
            if(e.key == 'status')
            {
                console.log("GGGgG");
            }
        });
    },
    watch:{
        date:function () {
            this.videos = [];
        }
    },
    methods:{

        get_camera:function () {
            var vm = this;
            var params = {};
            params.date = vm.date;
            axios.get('api/get_camera',{params:params})
            .then(function (response) {
                var data = response.data;
                vm.camera_list = data;
            })
            .catch(function (err) {
                console.log("GG");
            })
        },
        get_video:function (event) {
            var vm = this;
            var params= {};
            params.date = vm.date;
            var camera_id = event.target.innerText.split(' ')[1];
            params.camera = camera_id;

            axios.get('api/get_video',{params:params})
            .then(function (response) {
                var data = response.data;
                for(var i=0;i<data.length;i++)
                {
                    var id = data[i].pk;
                    data[i].fields.id = id;
                    var camera = data[i].fields.camera;
                    var date=data[i].fields.create_date;
                    var dateStr = date.replace(/\-/g, "");
                    var interval = data[i].fields.interval;
                    data[i].fields.video_url = '/static/mysite/video/'+dateStr+camera+interval+'.mp4';
                    var interval_time = "";
                    switch (interval)
                    {
                        case "0":
                            interval_time = "00:00-02:00";
                            break;
                        case "1":
                            interval_time = "02:00-04:00";
                            break;
                        case "2":
                            interval_time = "04:00-06:00";
                            break;
                        case "3":
                            interval_time = "06:00-08:00";
                            break;
                        case "4":
                            interval_time = "08:00-10:00";
                            break;
                        case "5":
                            interval_time = "10:00-12:00";
                            break;
                        case "6":
                            interval_time = "12:00-14:00";
                            break;
                        case "7":
                            interval_time = "14:00-16:00";
                            break;
                        case "8":
                            interval_time = "16:00-18:00";
                            break;
                        case "9":
                            interval_time = "18:00-20:00";
                            break;
                        case "10":
                            interval_time = "20:00-22:00";
                            break;
                        case "11":
                            interval_time = "22:00-24:00";
                            break;
                    }
                    data[i].fields.interval_time = interval_time;
                }
                vm.videos = data;
                vm.videos.camera = camera_id;
            })
            .catch(function (err) {
                console.log("GG");
            })
        },
        summarize:function(event){
            localStorage.setItem("status", 1);
            localStorage.setItem("video", event.target.id);
            console.log(event.target.id);
        },
    },

});


