FROM nginx:1.14.0
COPY dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
