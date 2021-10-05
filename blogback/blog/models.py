from django.db import models
from django.contrib.auth.models import AbstractBaseUser,PermissionsMixin,BaseUserManager
from django.db.models.signals import pre_save
from django.dispatch import receiver
from .util import unique_slug_generator
# Create your models here.

class UserAccountManager(BaseUserManager):
    def create_user(self,email,password=None,**extra_fields):
        if not email:
            raise ValueError('The given username must be set')
        email = self.normalize_email(email)
        
        user = self.model(email=email,**extra_fields)
        user.set_password(password) 
        user.save()
        return user
    def create_superuser(self,email=None, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self.create_user(email, password, **extra_fields)


class UserAccounts(AbstractBaseUser,PermissionsMixin):
    email = models.EmailField(max_length=255,unique=True)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    objects = UserAccountManager()
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS=['first_name','last_name']

    def get_full_name(self):
        return self.first_name + ' ' + self.last_name
    def get_short_name(self):
        return self.first_name
    def __str__(self):
        return self.email



class Blog(models.Model):
    author = models.ForeignKey(UserAccounts,on_delete=models.CASCADE,related_name='author_name')
    title = models.CharField(max_length=255)
    content = models.TextField()
    image = models.ImageField(upload_to = 'myphotos',blank=True,null=True)
    slug = models.SlugField(max_length = 250, null = True, blank = True)
    date = models.DateTimeField(auto_now_add=True)

    @property
    def author_name(self):
        return self.author.get_full_name()

    def __str__(self):
        return self.title


@receiver(pre_save, sender=Blog)
def pre_save_receiver(sender, instance, *args, **kwargs):
   if not instance.slug:
       instance.slug = unique_slug_generator(instance)