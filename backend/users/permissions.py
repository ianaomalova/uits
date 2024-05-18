from rest_framework.permissions import BasePermission, SAFE_METHODS
from django.contrib.auth.models import AnonymousUser


class IsModerator(BasePermission):
    def has_permission(self, request, view):
        return bool(
            request.user and
            not isinstance(request.user, AnonymousUser) and
            (request.user.is_superuser or request.user.is_moderator)
        )


class IsModeratorOrReadOnly(IsModerator):
    def has_permission(self, request, view):
        if request.method in SAFE_METHODS:
            return True
        else:
            return super().has_permission(request, view)


class IsTeacher(BasePermission):
    def has_permission(self, request, view):
        return bool(
            request.user and
            not isinstance(request.user, AnonymousUser) and
            (request.user.is_superuser or request.user.is_teacher)
        )
