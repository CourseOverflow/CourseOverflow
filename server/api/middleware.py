from django.middleware.csrf import CsrfViewMiddleware
from django.utils.translation import gettext_lazy as _
from functools import wraps


# ----------------------------------------------------------------------------


def custom_csrf_exempt(view_func):
    @wraps(view_func)
    def wrapped_view(*args, **kwargs):
        return view_func(*args, **kwargs)

    wrapped_view.custom_csrf_exempt = True
    return wrapped_view


# ----------------------------------------------------------------------------


class CustomCsrfMiddleware(CsrfViewMiddleware):
    REASON_BAD_TOKEN = _("CSRF token missing or incorrect.")

    def process_view(self, request, callback, callback_args, callback_kwargs):
        if request.method in ("GET", "HEAD", "OPTIONS", "TRACE"):
            return None

        if getattr(callback, "custom_csrf_exempt", False):
            return None

        csrf_token = request.META.get("HTTP_X_CSRFTOKEN")
        csrf_cookie = request.COOKIES.get("csrfToken")

        if not csrf_token or not csrf_cookie or csrf_token != csrf_cookie:
            return self._reject(request, reason=self.REASON_BAD_TOKEN)

        return super().process_view(
            request, callback, callback_args, callback_kwargs
        )


# ----------------------------------------------------------------------------
