from rest_framework.pagination import LimitOffsetPagination


class AchievementLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 10
    max_limit = 100
