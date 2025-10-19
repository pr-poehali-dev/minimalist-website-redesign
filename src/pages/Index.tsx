import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [activeTab, setActiveTab] = useState('main');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [reportDialogOpen, setReportDialogOpen] = useState(false);

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
      <header className="border-b border-border sticky top-0 z-50 bg-white/80 backdrop-blur-md">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <h1 className="text-xl font-semibold tracking-tight">Отключения</h1>
              
              <nav className="hidden md:flex gap-1">
                <button
                  onClick={() => setActiveTab('main')}
                  className={`px-4 py-2 text-sm font-medium transition-colors ${
                    activeTab === 'main' ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  Главная
                </button>
                <button
                  onClick={() => setActiveTab('outages')}
                  className={`px-4 py-2 text-sm font-medium transition-colors ${
                    activeTab === 'outages' ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  Отключения
                </button>
                <button
                  onClick={() => setActiveTab('map')}
                  className={`px-4 py-2 text-sm font-medium transition-colors ${
                    activeTab === 'map' ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  Карта
                </button>
                <button
                  onClick={() => setActiveTab('orgs')}
                  className={`px-4 py-2 text-sm font-medium transition-colors ${
                    activeTab === 'orgs' ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  Организации
                </button>
              </nav>
            </div>

            <div className="flex items-center gap-3">
              <Input 
                placeholder="Введите адрес" 
                className="hidden md:block w-64 h-9 text-sm"
              />
              
              {!isAuthenticated ? (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" className="hidden md:flex">
                      Войти
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle className="text-xl font-semibold">
                        {authMode === 'login' ? 'Вход' : 'Регистрация'}
                      </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                        <Input id="email" type="email" placeholder="your@email.com" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="password" className="text-sm font-medium">Пароль</Label>
                        <Input id="password" type="password" />
                      </div>
                      {authMode === 'register' && (
                        <div className="space-y-2">
                          <Label htmlFor="name" className="text-sm font-medium">Имя</Label>
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
                        className="text-sm text-muted-foreground hover:text-foreground w-full text-center transition-colors"
                      >
                        {authMode === 'login' ? 'Создать аккаунт' : 'Уже есть аккаунт?'}
                      </button>
                    </div>
                  </DialogContent>
                </Dialog>
              ) : (
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setIsAuthenticated(false)}
                  className="hidden md:flex"
                >
                  Выйти
                </Button>
              )}
            </div>
          </div>

          <div className="md:hidden mt-4">
            <Input 
              placeholder="Введите адрес" 
              className="w-full h-9 text-sm"
            />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12 max-w-7xl">
        {activeTab === 'main' && (
          <div className="space-y-12">
            <div>
              <h2 className="text-3xl font-semibold mb-8">Статистика</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card className="p-6 border border-border hover:shadow-sm transition-shadow">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Электричество</p>
                      <p className="text-3xl font-semibold">{stats.noElectricity}</p>
                    </div>
                    <Icon name="Zap" size={20} className="text-muted-foreground" />
                  </div>
                </Card>
                
                <Card className="p-6 border border-border hover:shadow-sm transition-shadow">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Вода</p>
                      <p className="text-3xl font-semibold">{stats.noWater}</p>
                    </div>
                    <Icon name="Droplet" size={20} className="text-muted-foreground" />
                  </div>
                </Card>
                
                <Card className="p-6 border border-border hover:shadow-sm transition-shadow">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Отопление</p>
                      <p className="text-3xl font-semibold">{stats.noHeating}</p>
                    </div>
                    <Icon name="Flame" size={20} className="text-muted-foreground" />
                  </div>
                </Card>
                
                <Card className="p-6 border border-border hover:shadow-sm transition-shadow">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Всего домов</p>
                      <p className="text-3xl font-semibold">{stats.total}</p>
                    </div>
                    <Icon name="Home" size={20} className="text-muted-foreground" />
                  </div>
                </Card>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-semibold">Актуальные отключения</h2>
                <Dialog open={reportDialogOpen} onOpenChange={setReportDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Icon name="Plus" size={16} className="mr-2" />
                      Сообщить об отключении
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle className="text-xl font-semibold">Сообщить об отключении</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="address" className="text-sm font-medium">Адрес</Label>
                        <Input id="address" placeholder="ул. Ленина, 45" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="description" className="text-sm font-medium">Описание</Label>
                        <Textarea 
                          id="description" 
                          placeholder="Опишите проблему"
                          className="min-h-24"
                        />
                      </div>
                      <Button 
                        className="w-full"
                        onClick={() => setReportDialogOpen(false)}
                      >
                        Отправить
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="space-y-3">
                {outages.map(outage => (
                  <Card key={outage.id} className="p-6 border border-border hover:shadow-sm transition-shadow">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="p-2 bg-muted rounded-lg">
                          <Icon name={getTypeIcon(outage.type)} size={20} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-medium">{getTypeLabel(outage.type)}</h3>
                            <Badge variant={outage.status === 'emergency' ? 'destructive' : 'secondary'} className="text-xs">
                              {outage.status === 'emergency' ? 'Авария' : 'Плановое'}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-1">{outage.address}</p>
                          <p className="text-sm text-muted-foreground">
                            {outage.houses} {outage.houses === 1 ? 'дом' : 'домов'} • {outage.start} - {outage.end}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'outages' && (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-semibold mb-2">Все отключения</h2>
              <p className="text-muted-foreground">Полный список плановых и аварийных отключений</p>
            </div>

            <div className="space-y-3">
              {outages.map(outage => (
                <Card key={outage.id} className="p-6 border border-border hover:shadow-sm transition-shadow">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="p-2 bg-muted rounded-lg">
                        <Icon name={getTypeIcon(outage.type)} size={20} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-medium">{getTypeLabel(outage.type)}</h3>
                          <Badge variant={outage.status === 'emergency' ? 'destructive' : 'secondary'} className="text-xs">
                            {outage.status === 'emergency' ? 'Авария' : 'Плановое'}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">{outage.address}</p>
                        <p className="text-sm text-muted-foreground">
                          {outage.houses} {outage.houses === 1 ? 'дом' : 'домов'} • {outage.start} - {outage.end}
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'map' && (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-semibold mb-2">Карта отключений</h2>
              <p className="text-muted-foreground">Визуализация отключений на карте города</p>
            </div>
            
            <Card className="p-12 border border-border">
              <div className="flex flex-col items-center justify-center text-center py-12">
                <div className="p-4 bg-muted rounded-full mb-4">
                  <Icon name="Map" size={32} className="text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Карта в разработке</h3>
                <p className="text-muted-foreground max-w-md">
                  Интерактивная карта отключений появится в ближайшее время
                </p>
              </div>
            </Card>
          </div>
        )}

        {activeTab === 'orgs' && (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-semibold mb-2">Организации</h2>
              <p className="text-muted-foreground">Управляющие компании и поставщики услуг</p>
            </div>

            <div className="space-y-3">
              {organizations.map(org => (
                <Card key={org.id} className="p-6 border border-border hover:shadow-sm transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-muted rounded-lg">
                      <Icon name="Building2" size={20} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium mb-3">{org.name}</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground mb-1">Домов в обслуживании</p>
                          <p className="font-medium">{org.houses}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground mb-1">Телефон</p>
                          <a href={`tel:${org.phone}`} className="font-medium hover:underline">
                            {org.phone}
                          </a>
                        </div>
                        <div>
                          <p className="text-muted-foreground mb-1">Email</p>
                          <a href={`mailto:${org.email}`} className="font-medium hover:underline">
                            {org.email}
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </main>

      <footer className="border-t border-border mt-24">
        <div className="container mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-semibold mb-4">О сервисе</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Информация о плановых и аварийных отключениях воды, света и отопления во Владивостоке
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Контакты</h3>
              <p className="text-sm text-muted-foreground">
                Email: info@outages.ru<br />
                Телефон: +7 (423) 240-00-00
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Полезные ссылки</h3>
              <div className="space-y-2">
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground block transition-colors">
                  Пользовательское соглашение
                </a>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground block transition-colors">
                  Политика конфиденциальности
                </a>
              </div>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-border text-center">
            <p className="text-sm text-muted-foreground">
              © 2025 Отключения. Все права защищены
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
