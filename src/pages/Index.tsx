import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [activeTab, setActiveTab] = useState('main');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [reportDialogOpen, setReportDialogOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const stats = {
    noElectricity: 5,
    noWater: 790,
    noHeating: 0,
    total: 795
  };

  const outages = [
    { id: 1, type: 'electricity', address: 'ул. Ленина, 45', houses: 12, start: '08:00', end: '18:00', status: 'planned' },
    { id: 2, type: 'water', address: 'пр. Победы, 23-67', houses: 156, start: '06:00', end: '20:00', status: 'emergency' },
    { id: 3, type: 'water', address: 'мкр. Центральный', houses: 234, start: '09:00', end: '17:00', status: 'planned' },
    { id: 4, type: 'electricity', address: 'ул. Садовая, 12', houses: 3, start: '10:00', end: '14:00', status: 'emergency' },
  ];

  const organizations = [
    { id: 1, name: 'МУПВ ВПЭС', houses: 273, phone: '+7 (423) 240-00-00', email: 'info@vpes.ru' },
    { id: 2, name: 'ООО "Дальневосточные Электрические Сети"', houses: 0, phone: '+7 (423) 245-12-34', email: 'support@des.ru' },
    { id: 3, name: 'АО "Оборонэнерго"', houses: 0, phone: '+7 (423) 231-45-67', email: 'contact@oboron.ru' },
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'electricity':
        return 'Zap';
      case 'water':
        return 'Droplet';
      case 'heating':
        return 'Flame';
      default:
        return 'AlertCircle';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'electricity':
        return 'Электричество';
      case 'water':
        return 'Вода';
      case 'heating':
        return 'Отопление';
      default:
        return 'Неизвестно';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild className="md:hidden">
                  <Button variant="ghost" size="icon">
                    <Icon name="Menu" size={24} />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-72">
                  <SheetHeader>
                    <SheetTitle className="flex items-center gap-2">
                      <Icon name="Radio" className="text-primary" size={24} />
                      Отключения
                    </SheetTitle>
                  </SheetHeader>
                  <nav className="flex flex-col gap-2 mt-6">
                    <button
                      onClick={() => {
                        setActiveTab('main');
                        setMobileMenuOpen(false);
                      }}
                      className={`px-4 py-3 rounded-lg text-left font-medium transition-colors ${
                        activeTab === 'main' ? 'bg-primary text-primary-foreground' : 'text-foreground hover:bg-muted'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon name="Home" size={18} />
                        Главная
                      </div>
                    </button>
                    <button
                      onClick={() => {
                        setActiveTab('outages');
                        setMobileMenuOpen(false);
                      }}
                      className={`px-4 py-3 rounded-lg text-left font-medium transition-colors ${
                        activeTab === 'outages' ? 'bg-primary text-primary-foreground' : 'text-foreground hover:bg-muted'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon name="AlertTriangle" size={18} />
                        Отключения
                      </div>
                    </button>
                    <button
                      onClick={() => {
                        setActiveTab('map');
                        setMobileMenuOpen(false);
                      }}
                      className={`px-4 py-3 rounded-lg text-left font-medium transition-colors ${
                        activeTab === 'map' ? 'bg-primary text-primary-foreground' : 'text-foreground hover:bg-muted'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon name="Map" size={18} />
                        Карта
                      </div>
                    </button>
                    <button
                      onClick={() => {
                        setActiveTab('orgs');
                        setMobileMenuOpen(false);
                      }}
                      className={`px-4 py-3 rounded-lg text-left font-medium transition-colors ${
                        activeTab === 'orgs' ? 'bg-primary text-primary-foreground' : 'text-foreground hover:bg-muted'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon name="Building2" size={18} />
                        Организации
                      </div>
                    </button>
                  </nav>
                  
                  <div className="mt-8 pt-6 border-t border-border">
                    {!isAuthenticated ? (
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button className="w-full">
                            <Icon name="User" size={16} className="mr-2" />
                            Войти
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md">
                          <DialogHeader>
                            <DialogTitle>{authMode === 'login' ? 'Вход' : 'Регистрация'}</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4 py-4">
                            <div className="space-y-2">
                              <Label htmlFor="mobile-email">Email</Label>
                              <Input id="mobile-email" type="email" placeholder="your@email.com" />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="mobile-password">Пароль</Label>
                              <Input id="mobile-password" type="password" />
                            </div>
                            {authMode === 'register' && (
                              <div className="space-y-2">
                                <Label htmlFor="mobile-name">Имя</Label>
                                <Input id="mobile-name" placeholder="Ваше имя" />
                              </div>
                            )}
                            <Button 
                              className="w-full" 
                              onClick={() => {
                                setIsAuthenticated(true);
                                setMobileMenuOpen(false);
                              }}
                            >
                              {authMode === 'login' ? 'Войти' : 'Зарегистрироваться'}
                            </Button>
                            <button
                              onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}
                              className="text-sm text-primary hover:underline w-full text-center"
                            >
                              {authMode === 'login' ? 'Создать аккаунт' : 'Уже есть аккаунт?'}
                            </button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    ) : (
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={() => {
                          setIsAuthenticated(false);
                          setMobileMenuOpen(false);
                        }}
                      >
                        <Icon name="LogOut" size={16} className="mr-2" />
                        Выйти
                      </Button>
                    )}
                  </div>
                </SheetContent>
              </Sheet>
              
              <Icon name="Radio" className="text-primary" size={28} />
              <h1 className="text-2xl font-semibold tracking-tight">Отключения</h1>
            </div>
            <div className="flex items-center gap-4">
              <nav className="hidden md:flex gap-1">
              <button
                onClick={() => setActiveTab('main')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === 'main' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Главная
              </button>
              <button
                onClick={() => setActiveTab('outages')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === 'outages' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Отключения
              </button>
              <button
                onClick={() => setActiveTab('map')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === 'map' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Карта
              </button>
              <button
                onClick={() => setActiveTab('orgs')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === 'orgs' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Организации
              </button>
              </nav>
              
              {!isAuthenticated ? (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Icon name="User" size={16} className="mr-2" />
                      Войти
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>{authMode === 'login' ? 'Вход' : 'Регистрация'}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="your@email.com" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="password">Пароль</Label>
                        <Input id="password" type="password" />
                      </div>
                      {authMode === 'register' && (
                        <div className="space-y-2">
                          <Label htmlFor="name">Имя</Label>
                          <Input id="name" placeholder="Ваше имя" />
                        </div>
                      )}
                      <Button 
                        className="w-full" 
                        onClick={() => setIsAuthenticated(true)}
                      >
                        {authMode === 'login' ? 'Войти' : 'Зарегистрироваться'}
                      </Button>
                      <button
                        onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}
                        className="text-sm text-primary hover:underline w-full text-center"
                      >
                        {authMode === 'login' ? 'Создать аккаунт' : 'Уже есть аккаунт?'}
                      </button>
                    </div>
                  </DialogContent>
                </Dialog>
              ) : (
                <div className="flex items-center gap-2">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setIsAuthenticated(false)}
                  >
                    <Icon name="LogOut" size={16} className="mr-2" />
                    Выйти
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="bg-primary/10 border-y border-primary/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Icon name="AlertCircle" className="text-primary" size={24} />
              <div>
                <p className="font-semibold">Знаете об отключении?</p>
                <p className="text-sm text-muted-foreground">Сообщите нам и помогите жителям</p>
              </div>
            </div>
            <Dialog open={reportDialogOpen} onOpenChange={setReportDialogOpen}>
              <DialogTrigger asChild>
                <Button className="whitespace-nowrap">
                  <Icon name="FileText" size={16} className="mr-2" />
                  Сообщить об отключении
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                  <DialogTitle>Сообщить об отключении</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="type">Тип отключения</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите тип" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="electricity">Электричество</SelectItem>
                        <SelectItem value="water">Горячая вода</SelectItem>
                        <SelectItem value="cold-water">Холодная вода</SelectItem>
                        <SelectItem value="heating">Отопление</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Адрес</Label>
                    <Input id="address" placeholder="ул. Ленина, 45" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Описание</Label>
                    <Textarea 
                      id="description" 
                      placeholder="Опишите ситуацию..."
                      rows={4}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact">Ваш телефон (необязательно)</Label>
                    <Input id="contact" type="tel" placeholder="+7 (___) ___-__-__" />
                  </div>
                  <Button 
                    className="w-full"
                    onClick={() => {
                      setReportDialogOpen(false);
                    }}
                  >
                    Отправить заявление
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8">
        {activeTab === 'main' && (
          <div className="space-y-8 animate-fade-in">
            <Card className="p-6 bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center">
                    <Icon name="Megaphone" className="text-primary" size={32} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Рекламное место</h3>
                    <p className="text-sm text-muted-foreground">Разместите здесь свою рекламу</p>
                  </div>
                </div>
                <Button variant="outline">
                  Узнать подробнее
                </Button>
              </div>
            </Card>

            <div className="text-center space-y-2 py-4">
              <h2 className="text-4xl font-semibold tracking-tight">Аварийность по жалобам</h2>
              <p className="text-muted-foreground text-lg">Актуальная статистика отключений во Владивостоке</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="p-6 hover:shadow-lg transition-shadow border-l-4 border-l-destructive">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Нет электричества</p>
                    <p className="text-3xl font-semibold mt-2">{stats.noElectricity}</p>
                    <p className="text-xs text-muted-foreground mt-1">домов</p>
                  </div>
                  <Icon name="Zap" className="text-destructive" size={40} />
                </div>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-shadow border-l-4 border-l-primary">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Нет горячей воды</p>
                    <p className="text-3xl font-semibold mt-2">{stats.noWater}</p>
                    <p className="text-xs text-muted-foreground mt-1">домов</p>
                  </div>
                  <Icon name="Droplet" className="text-primary" size={40} />
                </div>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-shadow border-l-4 border-l-muted">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Холодная вода</p>
                    <p className="text-3xl font-semibold mt-2">0</p>
                    <p className="text-xs text-muted-foreground mt-1">у всех есть</p>
                  </div>
                  <Icon name="Droplets" className="text-muted-foreground" size={40} />
                </div>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-shadow border-l-4 border-l-muted">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Отопление</p>
                    <p className="text-3xl font-semibold mt-2">{stats.noHeating}</p>
                    <p className="text-xs text-muted-foreground mt-1">включается...</p>
                  </div>
                  <Icon name="Flame" className="text-muted-foreground" size={40} />
                </div>
              </Card>
            </div>

            <Card className="p-8">
              <h3 className="text-xl font-semibold mb-6">График отключений за 30 дней</h3>
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium">Электричество</span>
                    <span className="text-sm text-muted-foreground">24 аварии</span>
                  </div>
                  <div className="h-16 flex items-end gap-1">
                    {Array.from({ length: 30 }).map((_, i) => (
                      <div
                        key={i}
                        className="flex-1 bg-destructive/20 rounded-t hover:bg-destructive/40 transition-colors"
                        style={{ height: `${Math.random() * 100}%` }}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium">Вода</span>
                    <span className="text-sm text-muted-foreground">156 аварий</span>
                  </div>
                  <div className="h-16 flex items-end gap-1">
                    {Array.from({ length: 30 }).map((_, i) => (
                      <div
                        key={i}
                        className="flex-1 bg-primary/20 rounded-t hover:bg-primary/40 transition-colors"
                        style={{ height: `${Math.random() * 100}%` }}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium">Отопление</span>
                    <span className="text-sm text-muted-foreground">0 аварий</span>
                  </div>
                  <div className="h-16 flex items-end gap-1">
                    {Array.from({ length: 30 }).map((_, i) => (
                      <div
                        key={i}
                        className="flex-1 bg-muted rounded-t"
                        style={{ height: '5%' }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}

        {activeTab === 'outages' && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight">Текущие отключения</h2>
              <p className="text-muted-foreground mt-2">Активные и плановые работы</p>
            </div>

            <div className="grid gap-4">
              {outages.map((outage) => (
                <Card key={outage.id} className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4 flex-1">
                      <div className={`p-3 rounded-lg ${outage.status === 'emergency' ? 'bg-destructive/10' : 'bg-primary/10'}`}>
                        <Icon
                          name={getTypeIcon(outage.type)}
                          className={outage.status === 'emergency' ? 'text-destructive' : 'text-primary'}
                          size={24}
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold">{outage.address}</h3>
                          <Badge variant={outage.status === 'emergency' ? 'destructive' : 'secondary'}>
                            {outage.status === 'emergency' ? 'Авария' : 'Плановое'}
                          </Badge>
                        </div>
                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Icon name="Home" size={14} />
                            {outage.houses} домов
                          </span>
                          <span className="flex items-center gap-1">
                            <Icon name="Clock" size={14} />
                            {outage.start} - {outage.end}
                          </span>
                          <span className="flex items-center gap-1">
                            <Icon name="Wrench" size={14} />
                            {getTypeLabel(outage.type)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'map' && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight">Карта отключений</h2>
              <p className="text-muted-foreground mt-2">Интерактивная карта Владивостока</p>
            </div>

            <Card className="p-8">
              <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                <div className="text-center space-y-4">
                  <Icon name="MapPin" className="text-muted-foreground mx-auto" size={64} />
                  <div>
                    <p className="text-lg font-medium text-muted-foreground">Карта в разработке</p>
                    <p className="text-sm text-muted-foreground mt-2">Здесь будет интерактивная карта с отметками отключений</p>
                  </div>
                </div>
              </div>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full bg-destructive" />
                  <span className="text-sm font-medium">Электричество - 5 точек</span>
                </div>
              </Card>
              <Card className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full bg-primary" />
                  <span className="text-sm font-medium">Вода - 790 точек</span>
                </div>
              </Card>
              <Card className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full bg-muted" />
                  <span className="text-sm font-medium">Отопление - 0 точек</span>
                </div>
              </Card>
            </div>
          </div>
        )}

        {activeTab === 'orgs' && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight">Управляющие организации</h2>
              <p className="text-muted-foreground mt-2">Контакты служб и количество обслуживаемых домов</p>
            </div>

            <div className="grid gap-4">
              {organizations.map((org) => (
                <Card key={org.id} className="p-6 hover:shadow-lg transition-shadow">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-lg font-semibold">{org.name}</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          Обслуживает {org.houses} {org.houses === 0 ? 'домов' : org.houses === 1 ? 'дом' : 'дома'}
                        </p>
                      </div>
                      <Icon name="Building2" className="text-muted-foreground" size={32} />
                    </div>
                    <div className="flex flex-wrap gap-4 pt-4 border-t border-border">
                      <a
                        href={`tel:${org.phone}`}
                        className="flex items-center gap-2 text-sm text-primary hover:underline"
                      >
                        <Icon name="Phone" size={16} />
                        {org.phone}
                      </a>
                      <a
                        href={`mailto:${org.email}`}
                        className="flex items-center gap-2 text-sm text-primary hover:underline"
                      >
                        <Icon name="Mail" size={16} />
                        {org.email}
                      </a>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </main>

      <footer className="border-t border-border mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © 2025 Отключения Владивостока. Информационный сервис
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                О проекте
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Контакты
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;