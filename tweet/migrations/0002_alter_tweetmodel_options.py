# Generated by Django 4.2.2 on 2023-06-28 09:40

from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ("tweet", "0001_initial"),
    ]

    operations = [
        migrations.AlterModelOptions(
            name="tweetmodel",
            options={"ordering": ["-id"]},
        ),
    ]
