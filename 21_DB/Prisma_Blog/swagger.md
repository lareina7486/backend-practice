openapi: 3.0.3
info:
  title: 공부의 숲 API
  version: 1.0.0
  description: 팀 프로젝트 "공부의 숲" REST API 문서

tags:
  - name: Study
    description: 스터디 관련 API
  - name: Habit
    description: 습관 관련 API
  - name: Emoji
    description: 이모지 관련 API
  - name: Focus
    description: 집중 및 포인트 관련 API
  - name: Auth
    description: 인증 관련 API

servers:
  - url: http://localhost:3000
    description: Local 개발 서버

paths:
  # ------------------------------
  # Study
  # ------------------------------
  /studies:
    get:
      tags:
        - Study
      summary: 스터디 목록 조회
      parameters:
        - in: query
          name: sort
          schema:
            type: string
            enum: [latest, points]
          description: 정렬 기준
        - in: query
          name: keyword
          schema:
            type: string
          description: 제목 또는 설명 검색어
        - in: query
          name: page
          schema:
            type: integer
            default: 1
        - in: query
          name: limit
          schema:
            type: integer
            default: 6
      responses:
        '200':
          description: 스터디 목록 조회 성공
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/StudyResponse'
    post:
      tags:
        - Study
      summary: 새로운 스터디 생성
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/StudyCreate'
      responses:
        '201':
          description: 스터디 생성 완료
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/StudyResponse'

  /studies/{studyId}:
    parameters:
      - in: path
        name: studyId
        required: true
        schema:
          type: string
    get:
      tags:
        - Study
      summary: 스터디 상세 정보 조회
      responses:
        '200':
          description: 상세 정보 반환
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/StudyResponse'
    patch:
      tags:
        - Study
      summary: 스터디 정보 수정
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/StudyUpdate'
      responses:
        '200':
          description: 수정 완료
    delete:
      tags:
        - Study
      summary: 스터디 삭제
      responses:
        '204':
          description: 삭제 완료

  /studies/{studyId}/password/verify:
    post:
      tags:
        - Auth
      summary: 스터디 수정/삭제 권한 확인 (비밀번호 검증)
      parameters:
        - in: path
          name: studyId
          required: true
          schema:
            type: string
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                password:
                  type: string
      responses:
        '200':
          description: 인증 성공
        '401':
          description: 비밀번호 불일치

  # ------------------------------
  # Habit
  # ------------------------------
  /studies/{studyId}/habits:
    parameters:
      - in: path
        name: studyId
        required: true
        schema:
          type: string
    get:
      tags:
        - Habit
      summary: 스터디 전체 습관 목록 조회
      responses:
        '200':
          description: 습관 목록 반환
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/HabitResponse'
    post:
      tags:
        - Habit
      summary: 새로운 습관 등록
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              required: [name]
              properties:
                name:
                  type: string
      responses:
        '201':
          description: 생성 완료

  /studies/{studyId}/habits/today:
    get:
      tags:
        - Habit
      summary: 오늘의 습관 및 달성 현황 조회
      parameters:
        - in: path
          name: studyId
          required: true
          schema:
            type: string
      responses:
        '200':
          description: 오늘의 습관 레코드 포함 목록
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/HabitWithRecord'

  /habits/{habitId}:
    parameters:
      - in: path
        name: habitId
        required: true
        schema:
          type: string
    patch:
      tags:
        - Habit
      summary: 습관 명칭 수정
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                name:
                  type: string
      responses:
        '200':
          description: 수정 완료
    delete:
      tags:
        - Habit
      summary: 습관 삭제 (Soft Delete 처리)
      responses:
        '204':
          description: 삭제 성공

  /habits/{habitId}/toggle:
    patch:
      tags:
        - Habit
      summary: 습관 체크/해제 (HabitRecord 생성 또는 삭제)
      parameters:
        - in: path
          name: habitId
          required: true
          schema:
            type: string
      responses:
        '200':
          description: 토글 성공 (현재 상태 반환)
          content:
            application/json:
              schema:
                type: object
                properties:
                  isDone:
                    type: boolean

  # ------------------------------
  # Emoji
  # ------------------------------
  /studies/{studyId}/emojis:
    parameters:
      - in: path
        name: studyId
        required: true
        schema:
          type: string
    get:
      tags:
        - Emoji
      summary: 스터디에 등록된 이모지 목록
    post:
      tags:
        - Emoji
      summary: 이모지 추가
      requestBody:
        content:
          application/json:
            schema:
              type: object
              properties:
                type:
                  type: string
                  example: "🔥"
      responses:
        '201':
          description: 추가 성공

  # ------------------------------
  # Focus
  # ------------------------------
  /studies/{studyId}/focus:
    post:
      tags:
        - Focus
      summary: 집중 종료 및 포인트 적립
      parameters:
        - in: path
          name: studyId
          required: true
          schema:
            type: string
      requestBody:
        content:
          application/json:
            schema:
              type: object
              properties:
                duration:
                  type: integer
                  description: 집중 시간 (분 단위)
      responses:
        '200':
          description: 포인트 업데이트 완료

# ------------------------------------------------------------------------------
# Components (Schema definitions)
# ------------------------------------------------------------------------------
components:
  schemas:
    BackgroundType:
      type: string
      enum: [green, yellow, blue, pink, alvaro, mikey, andrew, chris]

    StudyCreate:
      type: object
      required: [nickname, title, password, background]
      properties:
        nickname:
          type: string
        title:
          type: string
        introduction:
          type: string
        background:
          $ref: '#/components/schemas/BackgroundType'
        password:
          type: string
          format: password

    StudyUpdate:
      type: object
      properties:
        title:
          type: string
        introduction:
          type: string
        background:
          $ref: '#/components/schemas/BackgroundType'

    StudyResponse:
      type: object
      properties:
        id:
          type: string
        nickname:
          type: string
        title:
          type: string
        introduction:
          type: string
        background:
          $ref: '#/components/schemas/BackgroundType'
        totalPoint:
          type: integer
        createdAt:
          type: string
          format: date-time

    HabitResponse:
      type: object
      properties:
        id:
          type: string
        name:
          type: string
        studyId:
          type: string
        createdAt:
          type: string
          format: date-time

    HabitWithRecord:
      allOf:
        - $ref: '#/components/schemas/HabitResponse'
        - type: object
          properties:
            isDone:
              type: boolean
              description: 오늘 기준 완료 여부