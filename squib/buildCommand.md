After build react code 
copy `static` file into django static folder(create first in root) then create `static-root` and update  `settings.py`
```python
    STATIC_ROOT = os.path.join(BASE_DIR / "static-root") 
```
Then collect static files into static-root using below command
```bash
    python manage.py collectstatic
```

Check Test case `test.py` 

```bash
    python manage.py test
    python manage.py test <APP_NAME>
```