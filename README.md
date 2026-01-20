# Courier Service Website (статический сайт)

Это простой статический сайт (HTML) для проекта курьерской службы.

## Как открыть локально
1. Скачай репозиторий.
2. Открой файл `index.html` двойным кликом.

## Как включить GitHub Pages (ссылка на сайт)
### Вариант 1 — без Actions (самый простой)
1. На GitHub открой репозиторий → **Settings** → **Pages**
2. В разделе **Build and deployment** выбери:
   - **Source**: `Deploy from a branch`
   - **Branch**: `main` (или `master`) и папка `/ (root)`
3. Сохрани — через минуту появится ссылка вида `https://<username>.github.io/<repo>/`

### Вариант 2 — через GitHub Actions (автодеплой)
В репозитории уже добавлен workflow `.github/workflows/pages.yml`.
Чтобы он заработал:
1. Репозиторий → **Settings** → **Pages**
2. **Source**: `GitHub Actions`
3. Готово — пушишь изменения в `main`, и сайт обновляется автоматически.

## Структура
- `index.html` — главная страница
- `.nojekyll` — отключает Jekyll (чтобы всё грузилось как есть)
- `.github/workflows/pages.yml` — автодеплой на GitHub Pages
