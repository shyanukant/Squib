from django.test import TestCase
from django.contrib.auth import get_user_model
from .models import TweetModel
from rest_framework.test import APIClient

# Create your tests here.
User = get_user_model()

class tweetTestCase(TestCase):
    def setUp(self):
        # setup your database(users or entries)
        self.user = User.objects.create_user(username='shyanu', password="allowme")
        self.user2 = User.objects.create_user(username='shyanu2', password="allowme2")
        TweetModel.objects.create(content="My First tweet", user=self.user)
        TweetModel.objects.create(content="My Second tweet", user=self.user)
        TweetModel.objects.create(content="My Third tweet", user=self.user2)

        self.currentCount = TweetModel.objects.all().count()

    def test_tweet_created(self):
        tweet_obj = TweetModel.objects.create(content="My Fourth tweet", user=self.user)
        self.assertEqual(tweet_obj.id , 4)
        self.assertEqual(tweet_obj.user, self.user)
    
    def get_client(self):
        client = APIClient()
        client.login(username=self.user.username, password='allowme')
        return client

    def test_tweet_list(self):
        client = self.get_client()
        response = client.get('/api/tweets/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), 3)

    def test_tweet_action_like(self):
        client = self.get_client()
        response = client.post('/api/tweets/action/', {'id': 2, 'action': 'like'})
        self.assertEqual(response.status_code, 200)
        like_count = response.json().get("likes")
        self.assertEqual(like_count, 1)

    def test_tweet_action_unlike(self):
        client = self.get_client()
        response = client.post('/api/tweets/action/', {'id':2, 'action': 'unlike'})
        self.assertEqual(response.status_code, 200)
        like_count = response.json().get("likes")
        self.assertEqual(like_count, 0)

    def test_tweet_action_retweet(self):
        client = self.get_client()
        response = client.post('/api/tweets/action/', {'id': 3, 'action': 'retweet'})
        self.assertEqual(response.status_code, 201)
        data = response.json()
        new_tweet_id = data.get('id')
        self.assertNotEqual(new_tweet_id, 3)
        self.assertEqual(self.currentCount + 1, new_tweet_id)

    def test_api_tweet_create(self):
        client = self.get_client()
        request_data = {'content' : 'try to test api'}
        response = client.post('/api/tweets/create/', request_data)
        self.assertEqual(response.status_code, 201)
        response_data = response.json()
        new_tweet_id = response_data.get('id')
        self.assertNotEqual(new_tweet_id, 3)
        self.assertEqual(self.currentCount + 1, new_tweet_id)

    def test_api_tweet_detail(self):
        client = self.get_client()
        response = client.get('/api/tweets/2/')
        self.assertEqual(response.status_code, 201)

    def test_api_tweet_delete(self):
        client = self.get_client()
        response = client.delete('/api/tweets/2/delete')
        self.assertEqual(response.status_code, 200)
        client = self.get_client()
        response = client.delete('/api/tweets/2/delete')
        self.assertEqual(response.status_code, 404)
        incorrect_user_response = client.delete('/api/tweets/3/delete')
        self.assertEqual(incorrect_user_response.status_code, 401)