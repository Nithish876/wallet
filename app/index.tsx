// app/index.tsx
import { useEffect } from 'react';
import { router } from 'expo-router';
import { useAuth } from '@/context/AuthContext';
import { useAsyncStorage } from '@/hooks/useStorage';

export default function Index() {
  const { user, loading } = useAuth();
  const {
    value: isVisited,
    setValue,
    loading: visiting,
  } = useAsyncStorage<boolean | null>('isVisited', null);

  useEffect(() => {
    if (!loading && !visiting) {
      if (!isVisited) {
        setValue(true);
        router.replace('/onboarding');
      } else if (user) {
        router.replace('/(app)/(tabs)');
      } else {
        router.replace('/(auth)/login');
      }
    }
  }, [loading, visiting, isVisited, user]);

  return null;
}
