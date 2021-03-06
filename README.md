[![Maintainability](https://api.codeclimate.com/v1/badges/d371a38ac61a4e1f73a8/maintainability)](https://codeclimate.com/github/zipofar/funbox-test-2/maintainability)
[![Build Status](https://travis-ci.org/zipofar/funbox-test-2.svg?branch=master)](https://travis-ci.org/zipofar/funbox-test-2)

# Тестовое задание для компании Funbox
В основе лежит create-react-app https://github.com/facebook/create-react-app

Livedemo 

http://funbox.zipofar.ru/

https://glacial-taiga-70430.herokuapp.com/ usually sleep, please wait

### Run

```sh
$ make start
```
Go to [http://localhost:3000/](http://localhost:3000/)

### Run Test

```sh
$ make test
```


## Вопрос №1
Расскажите, чем, на ваш взгляд, отличается хорошее клиентское приложение от
плохого с точки зрения
* пользователя;
* менеджера проекта;
* дизайнера;
* верстальщика;
* серверного программиста. 

### Ответ
Для пользователя приложение должно обладать следующими параметрами:

* Интуитивно-понятный интерфейс;
* Быстрый отклик на действия;
* Иметь ту функциональность, на которую рассчитывает пользователь;
* Быть визуально приятным;

Для менеджера проекта не важно клиентское приложение или какое-либо другое. Главное это:
* Желательно иметь безграничные ресурсы;
* Возможность быстро добавлять необходимый функционал;
* Проект должен быть популярным, т.к. скорее всего это сильно влияет на вознаграждение и ЧСВ;

Для дизайнера:
* Иметь возможность реализовывать самые смелые фантазии дизайнера;
* Контингент, который пользуется приложением должен обладать чувством прекрасного, дабы не ранить тонкую душу дизайнера;

Для верстальщика:
* Дизайн приложения должен быть простым и лаконичным;
* Чтобы не было необходимости поддерживать браузеры IE и Safari;

Для серверного программиста:
* Должно генерировать правильные заголовки;
* Использовать последнюю версию API для этого приложения;
* Не хранить приватные данные в небезопасном месте или виде;

## Вопрос №2
Опишите основные особенности разработки крупных многостраничных сайтов,
функциональность которых может меняться в процессе реализации и поддержки.
Расскажите о своем опыте работы над подобными сайтами: какие подходы,
инструменты и технологии вы применяли на практике, с какими проблемами
сталкивались и как их решали.

### Ответ
Особенности:
* Много кода;
* Много кода написанного разными людьми, разной компетенции;
* Много кода, который неизвестно, что делает, на что влияет;
* Возмножно используется различный стек технологий в различных частях приложения;

Опыта работы в подобных проектах нет.

## Вопрос №3
При разработке интерфейсов с использованием компонентной архитектуры часто
используются термины Presentational Сomponents и Сontainer Сomponents. Что
означают данные термины? Зачем нужно такое разделение, какие у него есть
плюсы и минусы?

### Ответ
Presentational Сomponents - компонент, использующийся исключительно для отображения. Не имеет состояния. Т.к. данные приходят снаружи, его можно без проблем переиспользовать в другой части приложения. По сути является чистой функцией.
Сontainer Сomponents - компонент, в которм работают с данными. Имеет свое внутреннее изменяемое состояние. 

## Вопрос №4
Как устроено наследование в JS? Расскажите о своем опыте реализации JS-
наследования без использования фреймворков.
### Ответ
Опыта в реализации наследования в JS у меня нет. Единственное я 
знаю, что в JS прототипная модель наследования. На данный момент
у меня нет столько опыта, чтобы сравнивать прототипную модель и модель, 
основанную на классах. Чем они лучше или хуже. Они просто разные.

## Вопрос №5
Какие библиотеки можно использовать для написания тестов end-to-end во
фронтенде? Расскажите о своем опыте тестирования веб-приложений.
### Ответ
WebDriver + PhantomJS или обычный браузер + Jest или любой другой test runner. На данный момент использовал только Jest + Enzyme для тестирования React приложения.

## Вопрос №6
Вам нужно реализовать форму для отправки данных на сервер, состоящую из
нескольких шагов. В вашем распоряжении дизайн формы и статичная верстка, в
которой не показано, как форма должна работать в динамике. Подробного
описания, как должны вести себя различные поля в зависимости от 
действий пользователя, в требованиях к проекту нет. Ваши действия?
### Ответ
Обратиться к непосредственному руководителю для составления 
дальнейшего плана действий. Ибо реализация неизвестного 
функционала на собственное усмотрение может привести к бесполезной 
трате ресурсов компании.

## Вопрос №7
Расскажите, какие инструменты помогают вам экономить время в процессе
написания, проверки и отладки кода.
### Ответ
Самый главный инструмент - это мозг. Все остальное вторично. Но да, IDE
чуть-чуть упрощает процесс написания кода.

## Вопрос №8
Какие ресурсы вы используете для развития в профессиональной сфере? Приведите
несколько конкретных примеров (сайты, блоги и так далее).
Какие ещё области знаний, кроме тех, что непосредственно относятся к работе,
вам интересны?
### Ответ
Небезизвестный источник актуальной информации habrahabr.ru.
Самый лучший ресуср для обучения программированию hexlet.io.
Ну и книги стараюсь читать, но очень редко конечно, т.к. большую часть
времени уделяю практике. Так же интересны автомобили, воркаут, чуть
психологии аля Дейл Карнеги.

## Вопрос №9
Расскажите нам немного о себе и предоставьте несколько ссылок на последние
работы, выполненные вами.
### Ответ
Скромный интроверт с юмором. Общение люблю, но в малых порциях. 
Не пью, не курю. Ратую за здоровый образ жизни.
Учебный проект http://react-project.zipofar.ru.
 
