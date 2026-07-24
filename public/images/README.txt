=====================================================
Dossier des Images & Logos O'LO Hub
=====================================================

Vous pouvez placer ici toutes vos images, logos et éléments graphiques :
- logo.png
- hero-bg.jpg
- favicon.ico
- etc.

Dans vos templates HTML Django, vous pourrez utiliser vos images de cette façon :
{% load static %}
<img src="{% static 'images/votre_logo.png' %}" alt="Logo O'LO">
