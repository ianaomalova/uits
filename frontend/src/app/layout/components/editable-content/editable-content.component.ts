import { Component, HostListener, Input, OnInit, AfterViewChecked } from '@angular/core';
import { MarkdownService } from 'ngx-markdown';
import { AuthService } from '@app/shared/services/auth.service';
import { EditableContentService } from '@app/layout/components/editable-content/editable-content.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { EditorLocale } from 'angular-markdown-editor';
import { UNSAVED_WARN_MESSAGE } from '@app/configs/app.config';
import { fadeInOut } from '@app/shared/animations/fadeInOut.animation';
import * as Prism from 'prismjs';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-sql';
import 'prismjs/components/prism-javascript'; 
import 'prismjs/components/prism-css'; 


@Component({
  selector: 'app-editable-content',
  templateUrl: './editable-content.component.html',
  styleUrls: ['./editable-content.component.scss'],
  animations: [
    fadeInOut
  ]
})
export class EditableContentComponent implements OnInit, AfterViewChecked {
  locale: EditorLocale = {
    language: 'ru',
    dictionary: {
      'Bold': 'Жирный',
      'Italic': 'Italic',
      'Heading': 'Заголовок',
      'URL/Link': 'URL/Ссылка',
      'Image': 'Изображение',
      'List': 'Список',
      'Ordered List': 'Символьный список',
      'Unordered List': 'Числовой список',
      'Code': 'Код',
      'Quote': 'Цитата',
      'Preview': 'Превью',
      'Strikethrough': 'Зачёркнутый',
      'Table': 'Таблица',
      'strong text': 'Strong text',
      'emphasized text': 'emphasized text',
      'heading text': 'heading text',
      'enter link description here': 'Вставьте описание ссылки здесь',
      'Insert Hyperlink': 'Вставьте гиперссылку',
      'enter image description here': 'Введите описание изображения',
      'Insert Image Hyperlink': 'Вставьте ссылку на изображение',
      'enter image title here': 'Введите заголовок изображения',
      'list text here': 'текст для списка',
      '[ ]': 'Чекбокс',
      '[x]': 'Отмеченный чекбокс'
    }
  };

  @Input() page: string = '';
  content$: BehaviorSubject<string>;
  editorOptions: any;
  editMode: boolean = false;

  constructor(
    private markdownService: MarkdownService,
    public authService: AuthService,
    private editableContentService: EditableContentService
  ) {
    this.content$ = new BehaviorSubject(null);
  }

  ngOnInit(): void {
    this.editorOptions = {
      language: 'ru',
      parser: (val) => {
        let parsedMarkdown = this.markdownService.parse(val.trim());

        // Поддержка чекбоксов
        parsedMarkdown = parsedMarkdown.replace(/\[ \]/g, '<input type="checkbox">');
        parsedMarkdown = parsedMarkdown.replace(/\[x\]/g, '<input type="checkbox" checked>');

        return parsedMarkdown;
      }
    };

    this.initPage();
  }

  ngAfterViewChecked(): void {
    Prism.highlightAll();  // Подсветка синтаксиса после рендеринга
  }

  onSave(): void {
    this.editableContentService.updatePage(this.page, {
      text: this.content$.getValue(),
    }).subscribe(_ => {
      this.initPage();
      this.editMode = false;
    });
  }

  onCancel(): void {
    this.editMode = false;
    this.initPage();
  }

  private initPage(): void {
    this.editableContentService.getPage(this.page).subscribe({
      next: (editableContent) => {
        if (editableContent && editableContent.text) {
          this.content$.next(editableContent.text);
        } else {
          console.error('Контент страницы отсутствует или некорректен');
        }
      },
      error: (err) => {
        if (err?.status === 404) {
          console.error('Такой страницы не существует (404)');
        } else if (err && err.status) {
          console.error(`HTTP Error: ${err.status}`);
        } else {
          console.error('Непредвиденная ошибка сервера. Не удалось получить контент страницы');
        }
      }
    });
  }
  
  @HostListener('window:beforeunload')
  canDeactivate(): Observable<boolean> | boolean {
    return this.checkUnsavedChanges();
  }

  private checkUnsavedChanges(): boolean {
    return this.editMode ? confirm(UNSAVED_WARN_MESSAGE) : true;
  }

  
  }
