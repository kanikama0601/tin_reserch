# ベースイメージ（例: Debian/Alpine ベース）
FROM stilliard/pure-ftpd

# ロケールを設定する（Debianベース想定）
RUN apt-get update && \
    apt-get install -y locales && \
    sed -i '/ja_JP.UTF-8/s/^# //g' /etc/locale.gen && \
    locale-gen

ENV LANG ja_JP.UTF-8
ENV LC_ALL ja_JP.UTF-8

# Pure-FTPd の UTF-8 を有効にする（default 設定ファイル or オプション）
RUN echo "yes" > /etc/pure-ftpd/conf/UTF8

# ポート、ユーザーなどは必要に応じてここで設定
