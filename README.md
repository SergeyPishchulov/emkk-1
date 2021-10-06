# Электронная МКК

## Команда проекта

Имя, фамилия  | Группа | Логин
--- | --- | --- |
Пищулов Сергей | ФТ-301 | <a href=https://github.com/SergeyPishchulov>SergeyPishchulov</a>
Коновалов Артем | ФТ-301 | <a href=https://github.com/dabdya>dabdya</a>
Львов Ярослав | ФТ-301 | <a href=https://github.com/mistralook>mistralook</a>
Князев Игорь | ФТ-301 | <a href=https://github.com/Knyazzini>Knyazzini</a>


## Документация API

Пока существует в базвом виде на ```/api```


## Как запускать проект и не мучаться с зависимостями

1. Установить Docker для вашей операционной системы <a href=https://docs.docker.com/desktop/windows/install/>Windows</a> | <a href=https://docs.docker.com/engine/install/>Linux</a>
2. Если работаете под Windows, то нужно дополнительно установить <a href=https://docs.microsoft.com/en-us/windows/wsl/install>WSL</a>, так как контейнеры запускаются на Linux, и нельзя просто так шарить ядро Windows между ними.
3. Склонировать или обновить локальный репозиторий
4. Запустить Docker и открыть проект в IDE, а затем из корневой директории проекта вести в терминал команду ```docker-compose build```
5. Подождать пока сбилдится, это может занять много времени, ~10 минут, а вообще зависит от мощности компьютера. В дальнейшем, при ребилдинге, это будет происходить достаточно быстро из-за накполенного кэша.
6. Запустить проект с помощью команды ```docker-compose up```

Это все что сейчас нужно для того чтобы с нуля поднять проект и забыть про несовместимости окружения.

**Важно**. Если все вышеперечисленные пункты уже были проделаны один раз, то не нужно делать их заново.
В таком случае просто открываете IDE и вводите команду ```docker-compose up```.

Если что-то поменяется в файле ```docker-compose.yml```, то опять же, ничего делать не нужно, докер автоматически пересоздаст
все контейнеры.

Иногда, конечно, придется делать ребилдинг образов в ```Dockerfile```, но это будет гораздо быстрее и не потребует много усилий
из-за кэширования.

Стоит также отметить, что когда проект будет запущен, и нужно будет написать какой-то код,
то ничего перезапускать не нужно, все сервисы автоматически обновляются и сразу же отображают изменения.

#### Дополнительная информация

Во время билдинга докер создаст три образа:
* ```emkk-backend``` под бэкенд на Django
* ```emkk-frontend``` под фронтенд на React
* ```postgres``` под базу данных на PostgreSQL

Их можно будет увидеть через Docker Desktop или с помощью команды ```docker images```

Они требуют чуть больше гигабайта памяти, но зато включают в себя все необходимые зависимости.

Когда будет выполняться команда ```docker-compose up```, то докер создаст три контейнера из созданных ранее образов
и запустит на них описанные в ```docker-compose.yml``` сервисы. Контейнеры можно будет увидеть по команде ```docker ps -a```

Каждый контейнер будет иметь свое окружение и общаться с другими контейнерами по внутренней сети.
Для связи с внешним миром также есть свои порты.

Созданные ранее контейнеры можно удалить по команде ```docker-compose down``` из директории проекта, или
с помощью команды ```docker rm [id_container]```.

## Где хранятся данные из базы?

Когда проект будет собран впервые, postgres создаст базу данных внутри своего контейнера.
Пока контейнер работает — данные из него никуда не пропадут. Но когда контейнер завершит свою
работу или будет удален, то все данные потеряются. Принцип работы похож на оперативную память. 
Поэтому была создана метка тома из контейнера с базой данных 
в локальное хранилище по адресу ```emkk/data/db```. Пока контейнер работает, он адресует запись данных по такому адресу, 
и теперь при перезапуске он сможет получить ранее записанные данные.

Из этого следует следующее: пока идет разработка на разных компьютерах — у каждого база данных будет разная, если
явно не передавать данные из ```emkk/data/db``` друг другу, ну или сразу подгружать на гитхаб, но пока оно в игноре.

Соответственно, когда проект будет готов и настанет момент развернуть его на едином сервере, база будет согласована. 

Если нужно развернуть проект на нескольких серверах, то метка тома должна вести в какое-то единое хранилище (дата-центр), куда
могут обращаться все сервера.