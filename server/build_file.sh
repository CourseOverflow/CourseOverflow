echo "BUILD START"
python3.9 -m pip install --no-cache-dir -r requirements.txt
python3.9 manage.py collectstatic --noinput --clear
python3.9 manage.py migrate
echo "BUILD END"

