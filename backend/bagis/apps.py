from django.apps import AppConfig


class BagisConfig(AppConfig):
    name = 'bagis'

    def ready(self):
        import bagis.signals
