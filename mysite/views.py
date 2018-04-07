from django.shortcuts import render
from .models import Video,Object
from django.shortcuts import get_object_or_404, render
from django.http import HttpResponseRedirect, HttpResponse, JsonResponse
from django.urls import reverse
from django.shortcuts import render
import json
from datetime import datetime, date
#序列化
from django.core import serializers
#转dict
from django.forms.models import model_to_dict
# Create your views here.

def index(request):
    return render(request, 'mysite/index.html')

def screen(request):
    camera_list = Video.objects.values('camera').distinct()
    print(camera_list)
    return render(request, 'mysite/screen0.html', {'camera_list': camera_list})

def test(request):
    return render(request, 'mysite/test.html')

def screen0(request):
    return render(request, 'mysite/screen0.html')

def screen1(request):
    return render(request, 'mysite/screen1.html')

def screen2(request):
    return render(request, 'mysite/screen2.html')

def date_achieve_without(request):
    return HttpResponse('<h1>不带参数</h1>')

def get_camera(request):
    date = request.GET['date']
    camera_list = Video.objects.filter(create_date=date).values('camera').distinct()
    x =[]
    for i in camera_list:
        # i = json.dumps(i)
        x.append(i)

    return HttpResponse(json.dumps(x), content_type="application/json")

def get_video(request):
    camera_id = request.GET['camera']
    date = request.GET['date']
    video_list = Video.objects.filter(camera=camera_id, create_date=date)
    interval_list = video_list.values('interval')
    list = serializers.serialize("json", video_list)
    # return_list = {'camera': camera_id, 'date': date, 'interval_list': list}
    return HttpResponse(list, content_type="application/json")

def get_summary(request):
    pk = request.GET['pk']
    summary_video = Video.objects.get(pk=pk)
    a = []
    a.append(summary_video)
    return HttpResponse(serializers.serialize("json", a), content_type="application/json")


def get_object(request):
    pk = request.GET['pk']
    objectList = Object.objects.filter(camera_id=pk)
    list = []
    olist = []
    if len(objectList):
        list.append({'hasObject': 1})
        for item in objectList:
            olist.append(model_to_dict(item))
        list.append(olist)
        return HttpResponse(json.dumps(list), content_type="application/json")
        # return HttpResponse(serializers.serialize("json", objectList), content_type="application/json")
    else:
        list.append({'hasObject': 0})
        return HttpResponse(json.dumps(list), content_type="application/json")


def get_info(request):
    pk = request.GET['pk']
    info = Video.objects.get(id=pk)
    a = []
    a.append(info)
    return HttpResponse(serializers.serialize("json", a), content_type="application/json")


