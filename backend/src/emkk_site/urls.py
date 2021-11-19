from django.urls import path

from src.emkk_site.views import (
    DocumentList, DocumentDetail, DocumentProxyView,
    ReviewerView, IssuerView, ReviewDetail,
    TripList, TripDetail, change_trip_status, WorkRegisterView, )

urlpatterns = [
    path('trips', TripList.as_view()),
    path('trips/<int:pk>', TripDetail.as_view()),
    path('trips/<int:trip_id>/change-status', change_trip_status),
    path('trips/<int:pk>/documents', DocumentList.as_view()),
    path('trips/<int:pk>/documents/<int:doc_id>', DocumentDetail.as_view()),

    path('trips/<int:pk>/reviews', ReviewerView.as_view()),
    path('trips/<int:pk>/reviews/<int:rev_id>', ReviewDetail.as_view()),
    path('trips/<int:pk>/reviews-from-issuer', IssuerView.as_view()),
    path('trips/work', WorkRegisterView.as_view()),

    # path('media/<uuid:doc_uuid>', DocumentProxyView.as_view()),
    path('<uuid:doc_uuid>', DocumentProxyView.as_view()),
]

"""
trips GET - get all trips
trips POST - create new trip
trips/{id} GET - concrete trip
trips/{id} PUT - concrete trip
trips/{id} DELETE - concrete trip


trips/{trip_id}/documents - GET id's array of related documents
trips/{trip_id}/documents - POST - Creating
trips/{trip_id}/documents/{doc_id} - GET, PUT - Update, DELETE

trips/{trip_id}/reviews - GET array of related review
trips/{trip_id}/reviews - POST - Creating
trips/{trip_id}/reviews/{rev_id} - GET, PUT - Update, DELETE
"""
