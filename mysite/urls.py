from django.urls import path

from . import views

app_name = 'mysite'
urlpatterns = [
    path('', views.index, name='index'),
    path('screen/', views.screen, name='screen'),
    path('screen/test/<int:camera>', views.test, name='test'),
    #第一个screen0
    path('screen/screen0', views.screen0, name='screen0'),
    #第二个screen0
    path('screen/screen1', views.screen1, name='screen1'),
    #第三个screen0
    path('screen/screen2', views.screen2, name='screen2'),
    #id->info
    path('screen/api/get_info', views.get_info, name='get_info'),
    #date->camera,video
    path('screen/api/get_camera', views.get_camera, name='get_camera'),
    #请求video列表
    path('screen/api/get_video', views.get_video, name='get_video'),
    #请求summary
    path('screen/api/get_summary', views.get_summary, name='get_summary'),
    #请求object
    path('screen/api/get_object', views.get_object, name='get_object'),
]