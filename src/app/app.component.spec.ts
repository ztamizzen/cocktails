import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatBottomSheetHarness } from '@angular/material/bottom-sheet/testing';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { AppComponent } from './app.component';
import { MatBottomSheet } from '@angular/material/bottom-sheet';

let loader: HarnessLoader;
let fixture: ComponentFixture<AppComponent>;

describe('AppComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent],
      providers: [MatBottomSheet],
    });
    fixture = TestBed.createComponent(AppComponent);
    loader = TestbedHarnessEnvironment.loader(fixture);
    fixture.detectChanges();
  });

  it('should create the app', async () => {
    const bottomSheet = await loader.getHarness<MatBottomSheetHarness>(
      MatBottomSheetHarness.with({})
    );
    const app = fixture.componentInstance;
    expect(bottomSheet).toBeTruthy();
    expect(app).toBeTruthy();
  });

  it(`should have as title 'cocktails'`, () => {
    const app = fixture.componentInstance;
    expect(app.title).toEqual('cocktails');
  });

  it('should render title', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.content span')?.textContent).toContain(
      'cocktails app is running!'
    );
  });
});
