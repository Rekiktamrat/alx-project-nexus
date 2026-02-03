from django.utils.translation import gettext_lazy as _
from .models import Job

def dashboard_callback(request, context):
    """
    Callback to prepare custom dashboard statistics.
    """
    approved_count = Job.objects.filter(is_approved=True).count()
    pending_count = Job.objects.filter(is_approved=False).count()

    context.update({
        "kpi": [
            {
                "title": _("Live Jobs"),
                "metric": approved_count,
                "footer": _("Visible to public"),
                "color": "primary",
            },
            {
                "title": _("Pending Review"),
                "metric": pending_count,
                "footer": _("Waiting for approval"),
                "color": "warning",  # Highlight pending items
            },
        ]
    })
    return context
