# Онлайн-магазин (E-Commerce Store)

Приложение для знакомств с полноценным Backend на .NET и Frontend на Angular.

## 🛠 Стек технологий

### Backend
* **Язык:** C# 10
* **Платформа:** ASP.NET Core
* **База данных:** SQL Server


### Frontend
* **Фреймворк:** Angular
* **Язык:** TypeScript
* **Стилизация:** Bootstrap

---

## ⚙️ Настройки конфигурации

Перед запуском Backend-приложения добавьте следующие настройки в ваш файл конфигурации (`appsettings.json` или `appsettings.Development.json` / секреты пользователя):

```ini
TokenKey = your_data
ConnectionStrings:DefaultConnection = Server=(localdb)\MSSQLLocalDB;Database=DatingApp;Trusted_Connection=True;TrustServerCertificate=True
CloudinarySettings:CloudName = your_data
CloudinarySettings:ApiSecret = your_data
CloudinarySettings:ApiKey = your_data
```

---

## 🚀 Как запустить проект

### 1. Запуск Backend
Перейдите в папку с проектом API и запустите команду автоматического отслеживания изменений (hot reload):
```bash
dotnet watch run
```
*(Или просто `dotnet run`, если автоперезагрузка не требуется).*

### 2. Запуск Frontend
Перейдите в папку с фронтенд-приложением, установите зависимости (если запускаете впервые) и запустите сервер:
```bash
npm install
npm run start
```

---

## 🌐 Ссылки

После успешного запуска всех компонентов приложение будет доступно по адресу:
👉 **[http://localhost:4200/](http://localhost:4200/)**
