from dj_rest_auth.serializers import UserDetailsSerializer as DefaultUserDetailsSerializer
from django.contrib.auth import get_user_model

UserModel = get_user_model()


class UserDetailsSerializer(DefaultUserDetailsSerializer):
    class Meta:
        extra_fields = []

        if hasattr(UserModel, 'USERNAME_FIELD'):
            extra_fields.append(UserModel.USERNAME_FIELD)
        if hasattr(UserModel, 'EMAIL_FIELD'):
            extra_fields.append(UserModel.EMAIL_FIELD)
        if hasattr(UserModel, 'first_name'):
            extra_fields.append('first_name')
        if hasattr(UserModel, 'last_name'):
            extra_fields.append('last_name')
        if hasattr(UserModel, 'is_moderator'):
            extra_fields.append('is_moderator')
        if hasattr(UserModel, 'is_superuser'):
            extra_fields.append('is_superuser')
        if hasattr(UserModel, 'is_anonymous'):
            extra_fields.append('is_anonymous')
        if hasattr(UserModel, 'avatar'):
            extra_fields.append('avatar')
        if hasattr(UserModel, 'telegram_code'):
            extra_fields.append('telegram_code')
        if hasattr(UserModel, 'telegram_user'):
            extra_fields.append('telegram_user')
        model = UserModel
        fields = ('pk', *extra_fields)
        read_only_fields = ('email', 'is_moderator', 'is_superuser')

        depth = 1
