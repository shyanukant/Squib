from django.test import TestCase
from .models import Profile
from django.contrib.auth import get_user_model

# Create your tests here.
User = get_user_model()

class ProfileTestCase(TestCase):

    def setUp(self):
        self.user1= User.objects.create_user(username = 'tony', password = 'starkTower')
        self.user2= User.objects.create_user(username = 'mrrobot', password = 'fsociety')

    def test_profile_create(self):
        qs = Profile.objects.all()
        self.assertEqual(qs.count(), 2)

    def test_following(self):
        first = self.user1
        second = self.user2
        first.profile.followers.add(second) # added a follower
        second_user_following_whom = second.following.all()
        qs = second_user_following_whom.filter(user = first) # from a user, check other user is being followed
        first_user_following_no_one = first.following.all() # this user has is not following
        self.assertTrue(qs.exists())
        self.assertFalse(first_user_following_no_one.exists())