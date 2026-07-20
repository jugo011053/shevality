import React, { useEffect, useMemo, useState } from 'react';
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../theme/colors';
import { fonts } from '../../theme/fonts';
import { RootStackParamList } from '../../navigation/types';
import { Question, QUESTIONS } from '../../data/questionnaire';
import { useOnboarding } from '../../state/OnboardingState';

type Props = NativeStackScreenProps<RootStackParamList, 'Questionnaire'>;

const ADVANCE_DELAY = 220;

export function QuestionnaireScreen({ navigation }: Props) {
  const { hydrated, response, setAnswer, markQuestionnaireComplete } = useOnboarding();
  const [index, setIndex] = useState(0);
  const [initialized, setInitialized] = useState(false);
  const [textDraft, setTextDraft] = useState('');

  const flat = useMemo(() => {
    const out: Question[] = [];
    QUESTIONS.forEach((q) => {
      out.push(q);
      if (q.followUp && response.answers[q.id] === q.followUpIfValue) out.push(q.followUp);
    });
    return out;
  }, [response.answers]);

  useEffect(() => {
    if (hydrated && !initialized) {
      const firstUnanswered = QUESTIONS.findIndex((q) => !(q.id in response.answers) && !q.optional);
      setIndex(firstUnanswered === -1 ? 0 : firstUnanswered);
      setInitialized(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hydrated, initialized]);

  const q = flat[Math.min(index, flat.length - 1)];

  useEffect(() => {
    setTextDraft(q ? response.answers[q.id] ?? '' : '');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q?.id]);

  if (!hydrated || !initialized || !q) return null;

  const finish = () => {
    markQuestionnaireComplete();
    navigation.navigate('Result');
  };

  const goNext = () => {
    if (index >= flat.length - 1) finish();
    else setIndex((i) => i + 1);
  };

  const goBack = () => {
    if (index === 0) navigation.goBack();
    else setIndex((i) => Math.max(0, i - 1));
  };

  const selectAndAdvance = (value: string) => {
    setAnswer(q.id, value);
    setTimeout(goNext, ADVANCE_DELAY);
  };

  const currentValue = response.answers[q.id];
  const progress = (index + 1) / flat.length;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
      <View style={{ paddingHorizontal: 24, paddingTop: 10 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Pressable onPress={goBack} hitSlop={10}>
            <Text style={{ fontSize: 20, color: colors.ink }}>‹</Text>
          </Pressable>
          <Text style={{ fontFamily: fonts.hanken500, fontSize: 11.5, color: colors.mutedLight }}>
            {index + 1} / {flat.length}
          </Text>
        </View>
        <View style={{ height: 5, borderRadius: 3, backgroundColor: colors.cardBorder, marginTop: 10, overflow: 'hidden' }}>
          <View style={{ height: 5, borderRadius: 3, width: `${progress * 100}%`, backgroundColor: colors.purple }} />
        </View>
      </View>

      <ScrollView contentContainerStyle={{ paddingHorizontal: 26, paddingTop: 26, paddingBottom: 30, flexGrow: 1 }}>
        {!!q.blockTitle && (
          <Text style={{ fontFamily: fonts.hanken700, fontSize: 11, letterSpacing: 1.4, color: colors.pink, marginBottom: 10 }}>
            {q.blockTitle.toUpperCase()}
          </Text>
        )}
        {!!q.blockIntro && (
          <Text style={{ fontFamily: fonts.hanken400, fontSize: 13, lineHeight: 19, color: colors.muted, marginBottom: 16 }}>
            {q.blockIntro}
          </Text>
        )}

        <Text style={{ fontFamily: fonts.young, fontSize: 23, lineHeight: 29, color: colors.ink, letterSpacing: -0.2 }}>
          {q.prompt}
        </Text>

        <View style={{ marginTop: 24 }}>
          {q.type === 'single' && (
            <View style={{ gap: 10 }}>
              {q.options?.map((opt) => {
                const active = currentValue === opt.value;
                return (
                  <Pressable
                    key={opt.value}
                    onPress={() => selectAndAdvance(opt.value)}
                    style={{
                      paddingVertical: 16, paddingHorizontal: 18, borderRadius: 16,
                      borderWidth: 1.4, borderColor: active ? colors.purple : colors.cardBorder,
                      backgroundColor: active ? colors.purpleLight : colors.white,
                    }}
                  >
                    <Text style={{ fontFamily: fonts.hanken500, fontSize: 14.5, color: active ? colors.purple : colors.ink }}>{opt.label}</Text>
                  </Pressable>
                );
              })}
            </View>
          )}

          {q.type === 'scale' && (
            <View>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10, justifyContent: 'center' }}>
                {Array.from({ length: (q.scaleMax ?? 7) - (q.scaleMin ?? 1) + 1 }, (_, i) => (q.scaleMin ?? 1) + i).map((n) => {
                  const active = currentValue === String(n);
                  return (
                    <Pressable
                      key={n}
                      onPress={() => selectAndAdvance(String(n))}
                      style={{
                        width: 46, height: 46, borderRadius: 23, alignItems: 'center', justifyContent: 'center',
                        borderWidth: 1.6, borderColor: active ? colors.purple : colors.cardBorder,
                        backgroundColor: active ? colors.purple : colors.white,
                      }}
                    >
                      <Text style={{ fontFamily: fonts.hanken700, fontSize: 16, color: active ? colors.white : colors.ink }}>{n}</Text>
                    </Pressable>
                  );
                })}
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 12 }}>
                <Text style={{ flex: 1, fontFamily: fonts.hanken400, fontSize: 11, color: colors.mutedLight }}>{q.scaleMinLabel}</Text>
                {!!q.scaleMidLabel && (
                  <Text style={{ flex: 1, fontFamily: fonts.hanken400, fontSize: 11, color: colors.mutedLight, textAlign: 'center' }}>{q.scaleMidLabel}</Text>
                )}
                <Text style={{ flex: 1, fontFamily: fonts.hanken400, fontSize: 11, color: colors.mutedLight, textAlign: 'right' }}>{q.scaleMaxLabel}</Text>
              </View>
              {!!q.scaleNaLabel && (
                <Pressable
                  onPress={() => selectAndAdvance('na')}
                  style={{
                    marginTop: 18, paddingVertical: 13, borderRadius: 14, alignItems: 'center',
                    borderWidth: 1.4, borderColor: currentValue === 'na' ? colors.purple : colors.cardBorder,
                    backgroundColor: currentValue === 'na' ? colors.purpleLight : colors.white,
                  }}
                >
                  <Text style={{ fontFamily: fonts.hanken500, fontSize: 13, color: currentValue === 'na' ? colors.purple : colors.muted }}>{q.scaleNaLabel}</Text>
                </Pressable>
              )}
            </View>
          )}

          {q.type === 'text' && (
            <View>
              <TextInput
                value={textDraft}
                onChangeText={setTextDraft}
                onBlur={() => setAnswer(q.id, textDraft)}
                placeholder={q.placeholder}
                placeholderTextColor={colors.mutedLighter}
                multiline
                style={{
                  minHeight: 100, borderWidth: 1.4, borderColor: colors.cardBorder, backgroundColor: colors.white,
                  borderRadius: 16, padding: 16, fontFamily: fonts.hanken400, fontSize: 14, color: colors.ink, textAlignVertical: 'top',
                }}
              />
              <View style={{ flexDirection: 'row', gap: 10, marginTop: 16 }}>
                {q.optional && (
                  <Pressable
                    onPress={() => {
                      setAnswer(q.id, textDraft.trim());
                      goNext();
                    }}
                    style={{ flex: 1, height: 50, borderRadius: 25, borderWidth: 1.5, borderColor: colors.ink, alignItems: 'center', justifyContent: 'center' }}
                  >
                    <Text style={{ fontFamily: fonts.hanken600, fontSize: 13.5, color: colors.ink }}>Überspringen</Text>
                  </Pressable>
                )}
                <Pressable
                  onPress={() => {
                    setAnswer(q.id, textDraft.trim());
                    goNext();
                  }}
                  disabled={!q.optional && textDraft.trim().length === 0}
                  style={{
                    flex: 1, height: 50, borderRadius: 25, alignItems: 'center', justifyContent: 'center',
                    backgroundColor: !q.optional && textDraft.trim().length === 0 ? colors.purpleRingOff : colors.purple,
                  }}
                >
                  <Text style={{ fontFamily: fonts.hanken600, fontSize: 13.5, color: colors.white }}>Weiter</Text>
                </Pressable>
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
