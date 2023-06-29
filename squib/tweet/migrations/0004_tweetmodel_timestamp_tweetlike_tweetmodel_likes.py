# Generated by Django 4.2.2 on 2023-06-28 17:53

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ("tweet", "0003_tweetmodel_user"),
    ]

    operations = [
        migrations.AddField(
            model_name="tweetmodel",
            name="timestamp",
            field=models.DateTimeField(auto_now=True),
        ),
        migrations.CreateModel(
            name="TweetLike",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("timestamp", models.DateTimeField(auto_now=True)),
                (
                    "tweet",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to="tweet.tweetmodel",
                    ),
                ),
                (
                    "user",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
        ),
        migrations.AddField(
            model_name="tweetmodel",
            name="likes",
            field=models.ManyToManyField(
                blank=True,
                related_name="tweet_like",
                through="tweet.TweetLike",
                to=settings.AUTH_USER_MODEL,
            ),
        ),
    ]