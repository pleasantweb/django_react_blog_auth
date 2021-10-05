from django.contrib import admin
from django.utils.translation import gettext, gettext_lazy as _
from .models import UserAccounts,Blog

# Register your models here.

@admin.register(UserAccounts)
class UserAccountsAdmin(admin.ModelAdmin):
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        (_('Personal info'), {'fields': ('first_name', 'last_name')}),
        (_('Permissions'), {
            'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions'),
        }),
        # (_('Important dates'), {'fields': ('last_login', 'date_joined')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'password1', 'password2'),
        }),
    )
    list_display = ('id','email', 'first_name', 'last_name', 'is_staff')

@admin.register(Blog)
class BlogAdmin(admin.ModelAdmin):
    list_display =('id','title','author','image','date')