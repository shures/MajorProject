# Generated by Django 2.2.4 on 2019-08-22 05:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0005_trending'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='caption',
            field=models.CharField(max_length=100),
        ),
        migrations.AlterField(
            model_name='post',
            name='content',
            field=models.CharField(max_length=100),
        ),
        migrations.AlterField(
            model_name='post',
            name='date',
            field=models.CharField(max_length=100),
        ),
    ]
