from django.contrib import admin
from django.utils.timezone import now
from .models import Question, Hadith

@admin.register(Question)
class QuestionAdmin(admin.ModelAdmin):
    list_display = ('id', 'text_snippet', 'has_answer', 'is_anonymous', 'created_at')
    list_filter = ('is_anonymous', 'created_at')
    search_fields = ('text', 'answer')
    readonly_fields = ('created_at', 'answered_at')

    def text_snippet(self, obj):
        return obj.text[:50] + "..." if len(obj.text) > 50 else obj.text
    text_snippet.short_description = "Soru"

    def has_answer(self, obj):
        return bool(obj.answer)
    has_answer.boolean = True
    has_answer.short_description = "Cevaplandı mı?"

    def save_model(self, request, obj, form, change):
        if 'answer' in form.changed_data and obj.answer:
            obj.answered_at = now()
            if not obj.answered_by:
                obj.answered_by = str(request.user)
        super().save_model(request, obj, form, change)

@admin.register(Hadith)
class HadithAdmin(admin.ModelAdmin):
    list_display = ('source', 'text_snippet', 'day_of_year')
    search_fields = ('source', 'text', 'reference')

    def text_snippet(self, obj):
        return obj.text[:50] + "..." if len(obj.text) > 50 else obj.text
    text_snippet.short_description = "Hadis"
