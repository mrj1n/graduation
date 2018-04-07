from django.db import models
from django.utils import timezone
# Create your models here.
class Video(models.Model):
    camera = models.CharField(max_length=100)
    create_date = models.DateField(db_column='create_date')
    interval = models.CharField(max_length=100, default='0')
    hasSummary = models.CharField(max_length=1, default=0)

class Object(models.Model):
    # camera = models.ForeignKey(Video)
    # create_date = models.ForeignKey(Video)
    sex = models.CharField(max_length=2)
    sex_confidence = models.CharField(max_length=100, default=0.0000)
    upper_cloth_color = models.CharField(max_length=100)
    upper_cloth_color_confidence = models.CharField(max_length=100, default=0.0000)
    down_cloth_color = models.CharField(max_length=100, default='black')
    down_cloth_color_confidence = models.CharField(max_length=100, default=0.0000)
    camera_id = models.ForeignKey("Video", on_delete=models.CASCADE, default=1)