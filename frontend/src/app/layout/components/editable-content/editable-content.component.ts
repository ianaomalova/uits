import {Component, HostListener, Input, OnInit} from '@angular/core';
import {MarkdownService} from "ngx-markdown";
import {AuthService} from "@app/shared/services/auth.service";
import {EditableContentService} from "@app/layout/components/editable-content/editable-content.service";
import {BehaviorSubject, Observable} from "rxjs";
import {EditorLocale} from "angular-markdown-editor";
import {UNSAVED_WARN_MESSAGE} from "@app/configs/app.config";
import {fadeInOut} from "@app/shared/animations/fadeInOut.animation";

@Component({
  selector: 'app-editable-content',
  templateUrl: './editable-content.component.html',
  styleUrls: ['./editable-content.component.scss'],
  animations: [
    fadeInOut
  ]
})
export class EditableContentComponent implements OnInit {
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
      'list text here': 'текст для списка'
    }
  };

  @Input() page: string = '';
  content$: BehaviorSubject<string>;
  editorOptions: any;
  editMode: boolean = false;


  constructor(private markdownService: MarkdownService,
              public authService: AuthService,
              private editableContentService: EditableContentService) {
    this.content$ = new BehaviorSubject(null);
  }

  ngOnInit(): void {
    this.editorOptions = {
      language: 'ru',
      parser: (val) => this.markdownService.parse(val.trim())
    }

    this.initPage();
  }

  onSave(): void {
    this.editableContentService.updatePage(this.page, {
      text: this.content$.getValue(),
    }).subscribe(_ => {
      this.initPage();
      this.editMode = false;
    })
  }

  onCancel(): void {
    this.editMode = false;
    this.initPage();
  }

  private initPage() {
    this.editableContentService.getPage(this.page).subscribe({
      next: editableContent => {
        console.log(editableContent);
        this.content$.next(editableContent.text);
      },
      error: err => {
        console.error("HTTP ERR ", err.status);
        if (err.status) {
          console.error('Такой страницы не существует');
        } else {
          console.error('Непредвиденная ошибка сервера. Не удалось получить контент страницы');
        }
      }
    })
  }

  @HostListener('window:beforeunload')
  canDeactivate(): Observable<boolean> | boolean {
    return this.checkUnsavedChanges();
  }

  private checkUnsavedChanges(): boolean {
    return this.editMode ? confirm(UNSAVED_WARN_MESSAGE) : true;
  }
}
